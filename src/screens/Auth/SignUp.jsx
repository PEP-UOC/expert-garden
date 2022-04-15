import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

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

//Hooks
import { useKeyboardSize } from "../../hooks/useKeyboardSize"

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

    //State
    const [values, setValues] = useState({
        name: "",
        surnames: "",
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
            <Text style={{ ...gloStyles.inputs.captionText }}>Utiliza un mínimo de 6 carácteres</Text>
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

        const { email, password, password2, name, surnames, role } = values

        dispatch(setLoadingMessage(debug ? '🔧 Registrándote!' : 'Registrándote!'))

        if (!allFilled()) {
            if (password == password2) {
                auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        console.info('Registered!');
                        console.info(user.user.email);
                        auth().currentUser.sendEmailVerification()
                            .then(() => {
                                console.info('Email verification sent!');
                                dispatch(addUser(user))
                                firestore().collection("users").doc(auth().currentUser.uid).set({
                                    uid: auth().currentUser.uid,
                                    name,
                                    surnames,
                                    fullname: `${name} ${surnames}`,
                                    role,
                                    email
                                })
                                    .then(() => {
                                        auth().currentUser.updateProfile({
                                            displayName: `${name} ${surnames}`,
                                        }).then(() => {
                                            dispatch(updateUser({
                                                metadata: {
                                                    name,
                                                    surnames,
                                                    fullname: `${name} ${surnames}`,
                                                    role,
                                                    email
                                                }
                                            }))
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

    //Keyboard
    const [keyboardSize, keyboardIsOpen] = useKeyboardSize()

    function hideKeyboard() {
        console.log("⌨️ HIDE Keyboard")
        Keyboard.dismiss()
    }

    const renderKeyboardIcon = (props) => (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            {keyboardIsOpen ? <CornerRightDownIcon {...props} /> : <></>}
        </TouchableWithoutFeedback>
    );

    //Checks
    function allFilled() {
        return values?.name === '' || (values?.surnames === '' && values?.role === 'client') || values?.role === '' || values?.email === '' || values?.password === '' || values?.password2 === ''
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

    console.log('keyboardSize', keyboardSize)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
                contentContainerStyle={{ ...gloStyles.scrollView, ...ownStyles?.scrollHeight }}>
                <Layout style={{ ...gloStyles.layout, marginTop: (keyboardSize - 40) * -1 }}>
                    <View style={{ ...gloStyles.view }}>
                        <View style={{ ...gloStyles.section.full }}>

                            <Text category='h6' style={{ ...gloStyles?.h6, ...ownStyles?.topSubTitle }}>REGISTRATE EN</Text>
                            <Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle }}>EXPERT GARDEN</Text>

                            <Select
                                style={{ ...gloStyles.inputs.select }}
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
                                style={{ ...gloStyles.inputs.input }}
                                label={values.role === 'client' ? 'Nombre' : 'Nombre de la empresa'}
                                placeholder={values.role === 'client' ? 'Introduce tu nombre' : 'Introduce el nombre comercial'}
                                value={values?.name || ''}
                                onChangeText={text => handleChange(text, "name")}
                                accessoryRight={renderKeyboardIcon}
                            />
                            {values.role === 'client' &&
                                <Input
                                    style={{ ...gloStyles.inputs.input }}
                                    label={'Apellidos'}
                                    placeholder={'Introduce tus apellidos'}
                                    value={values?.surnames || ''}
                                    onChangeText={text => handleChange(text, "surnames")}
                                    accessoryRight={renderKeyboardIcon}
                                />
                            }
                            <Input
                                style={{ ...gloStyles.inputs.input }}
                                label='Correo electrónico'
                                placeholder='Introduce tu correo electrónico'
                                value={values?.email || ''}
                                onChangeText={text => handleChange(text, "email")}
                                accessoryRight={renderKeyboardIcon}
                            />
                            <Input
                                style={{ ...gloStyles.inputs.input }}
                                label='Contraseña'
                                placeholder='Introduce tu contraseña'
                                value={values?.password || ''}
                                caption={renderCaption}
                                accessoryRight={renderEyeIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={text => handleChange(text, "password")}
                            />
                            <Input
                                style={{ ...gloStyles.inputs.input, marginBottom: 30 }}
                                label='Contraseña'
                                placeholder='Confirma la contraseña'
                                value={values?.password2 || ''}
                                accessoryRight={renderEyeIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={text => handleChange(text, "password2")}
                            />

                            <Button style={{ ...gloStyles?.button }} onPress={() => SignUp()}>REGISTRARSE</Button>

                            <Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("Login")}>¿Ya tienes cuenta?</Button>

                            <View style={{ alignItems: 'center' }}>
                                <LeafIcon width={180} height={60} style={{ ...gloStyles.leaf }} />
                            </View>
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