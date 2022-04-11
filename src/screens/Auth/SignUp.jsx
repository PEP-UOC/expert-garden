import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

import AsyncStorage from '@react-native-async-storage/async-storage';

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setLoggedIn, setLoadingMessage, setErrorMessage } from '../../store/root/rootAction';
import { addUser, updateUser } from '../../store/user/userAction';

//Components
import { View, TouchableWithoutFeedback, SafeAreaView, ScrollView, Keyboard } from 'react-native'
import { Text, Button, Layout, Input, Icon, Select, SelectItem, IndexPath } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { CornerRightDownIcon } from '../../assets/icons/CornerRightDown'
import { LeafIcon } from '../../assets/icons/Leaf'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

//Select Options
const userTypes = [
    {
        name: 'client',
        value: 'Soy un Cliente'
    },
    {
        name: 'business',
        value: 'Soy una Empresa'
    },
];

// eslint-disable-next-line no-unused-vars
export const SignUpScreen = ({ debug, navigation }) => {
    const dispatch = useDispatch()

    //Firebase
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    //State
    const [values, setValues] = useState({
        fullname: "",
        role: "client",
        email: "",
        password: "",
        password2: ""
    })

    //Secure pass
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const renderEyeIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry} onClick={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const renderCaption = () => {
        return (
            <Text style={{ ...fullStyles.inputs.captionText }}>Utiliza un mínimo de 6 carácteres</Text>
        )
    }

    //Handle
    function handleChange(value, keyName) {
        setValues(prevValues => {
            return {
                ...prevValues,
                [keyName]: value
            }
        })
    }

    //SignUp
    function SignUp() {

        const { email, password, password2, fullname, role } = values

        dispatch(setLoadingMessage(debug ? '🔧 Registrándote!' : 'Registrándote!'))

        if (!allFilled()) {
            if (password == password2) {
                auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        console.info('Registered!');
                        console.info(user.user.email);
                        AsyncStorage.setItem('emailForSignIn', user.user.email);
                        var actionCodeSettings = {
                            //url: `${redirectUrl}/${firebase.auth().currentUser.email}`,
                            url: `https://expertgarden.page.link/confirmemail`,
                            handleCodeInApp: true,
                            dynamicLinkDomain: "expertgarden.page.link"
                        };
                        console.log('actionCodeSettings', actionCodeSettings)
                        auth().currentUser.sendEmailVerification()
                            .then(() => {
                                console.info('Email verification sent!');
                                dispatch(addUser(user))
                                firestore().collection("users").doc(auth().currentUser.uid).set({
                                    uid: auth().currentUser.uid,
                                    fullname,
                                    role,
                                    email
                                })
                                    .then(() => {
                                        auth().currentUser.updateProfile({
                                            displayName: fullname
                                        }).then(() => {
                                            dispatch(updateUser(values))
                                            dispatch(setLoggedIn(true))
                                            dispatch(setLoadingMessage(false))
                                            dispatch(setErrorMessage(false))
                                        }).catch((error) => {
                                            console.error(error.message);
                                            dispatch(setLoggedIn(false))
                                            dispatch(setLoadingMessage(false))
                                            dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
                                        });
                                    })
                                    .catch((error) => {
                                        console.error(error.message);
                                        dispatch(setLoggedIn(false))
                                        dispatch(setLoadingMessage(false))
                                        dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
                                    });
                            });
                    })
                    .catch((error) => {
                        console.error(error.message);
                        dispatch(setLoggedIn(false))
                        dispatch(setLoadingMessage(false))
                        dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
                    });
            } else {
                dispatch(setLoggedIn(false))
                dispatch(setLoadingMessage(false))
                dispatch(setErrorMessage('Las contraseñas no coinciden'))
            }
        } else {
            dispatch(setLoggedIn(false))
            dispatch(setLoadingMessage(false))
            dispatch(setErrorMessage('Rellena todos los campos'))
        }
    }

    //Hide Keyboard
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardIsOpen(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardIsOpen(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function hideKeyboard() {
        console.log("HIDE")
        Keyboard.dismiss()
    }

    const renderKeyboardIcon = (props) => (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            {keyboardIsOpen ? <CornerRightDownIcon {...props} /> : <></>}
        </TouchableWithoutFeedback>
    );

    //Checks
    function allFilled() {
        return values?.fullname === '' || values?.role === '' || values?.email === '' || values?.password === '' || values?.password2 === ''
    }

    useEffect(() => {
        dispatch(setLoadingMessage(false))
        dispatch(setErrorMessage(false))
    }, []);

    //Select
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const displayValue = userTypes[selectedIndex.row].value;
    const renderOption = (title) => (
        <SelectItem key={title} title={title} />
    );


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
                contentContainerStyle={{ ...fullStyles.scrollView }}>
                <Layout style={{ ...fullStyles.layout }}>
                    <View style={{ ...fullStyles.view }}>

                        <Text category='h6' style={{ ...fullStyles?.h6 }}>REGISTRATE EN</Text>
                        <Text category='h1' style={{ ...fullStyles?.h1 }}>EXPERT GARDEN</Text>

                        <Select
                            style={{ ...fullStyles.inputs.select }}
                            label='¿Quién eres?'
                            value={displayValue}
                            selectedIndex={selectedIndex}
                            onSelect={index => {
                                setSelectedIndex(index)
                                handleChange(userTypes[index - 1].name, "role")
                            }}>
                            {userTypes.map(uT => uT.value).map(renderOption)}
                        </Select>
                        <Input
                            style={{ ...fullStyles.inputs.input }}
                            label={values.role === 'client' ? 'Nombre completo' : 'Nombre de la empresa'}
                            placeholder={values.role === 'client' ? 'Introduce tu nombre completo' : 'Introduce el nombre comercial'}
                            value={values?.fullname || ''}
                            onChangeText={text => handleChange(text, "fullname")}
                            accessoryRight={renderKeyboardIcon}
                        />
                        <Input
                            style={{ ...fullStyles.inputs.input }}
                            label='Correo electrónico'
                            placeholder='Introduce tu correo electrónico'
                            value={values?.email || ''}
                            onChangeText={text => handleChange(text, "email")}
                            accessoryRight={renderKeyboardIcon}
                        />
                        <Input
                            style={{ ...fullStyles.inputs.input }}
                            label='Contraseña'
                            placeholder='Introduce tu contraseña'
                            value={values?.password || ''}
                            caption={renderCaption}
                            accessoryRight={renderEyeIcon}
                            secureTextEntry={secureTextEntry}
                            onChangeText={text => handleChange(text, "password")}
                        />
                        <Input
                            style={{ ...fullStyles.inputs.input, marginBottom: 40 }}
                            label='Contraseña'
                            placeholder='Confirma la contraseña'
                            value={values?.password2 || ''}
                            accessoryRight={renderEyeIcon}
                            secureTextEntry={secureTextEntry}
                            onChangeText={text => handleChange(text, "password2")}
                        />

                        <Button style={{ ...fullStyles?.button }} onPress={() => SignUp()}>REGISTRARSE</Button>

                        <Button style={{ ...fullStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("Login")}>¿Ya tienes cuenta?</Button>

                        <View style={{ alignItems: 'center' }}>
                            <LeafIcon width={180} height={60} style={{ ...fullStyles.leaf }} />
                        </View>
                    </View>
                </Layout >
            </ScrollView>
        </SafeAreaView>)
}

SignUpScreen.propTypes = {
    debug: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};

SignUpScreen.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};