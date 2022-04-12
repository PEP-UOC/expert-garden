import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage, setLoggedIn } from '../../store/root/rootAction';
import { addUser, updateUser } from '../../store/user/userAction';

//Components
import { View, TouchableWithoutFeedback, SafeAreaView, ScrollView, Keyboard } from 'react-native'
import { Text, Button, Layout, Input, Icon } from '@ui-kitten/components';

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

// eslint-disable-next-line no-unused-vars
export const LoginScreen = ({ debug, navigation }) => {
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
        email: "",
        password: ""
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

    //Handle
    function handleChange(value, keyName) {
        setValues(prevValues => {
            return {
                ...prevValues,
                [keyName]: value
            }
        })
    }

    //Login
    function Login() {

        const { email, password } = values

        dispatch(setLoadingMessage(debug ? '🔧 Accediendo' : 'Accediendo'))

        auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.info('Logged In!');
                console.info(user.user.email);
                dispatch(addUser(user))
                firestore().collection("users").doc(auth().currentUser.uid).get()
                    .then((user) => {
                        dispatch(updateUser(user.data()))
                        dispatch(setLoggedIn(true))
                        dispatch(setLoadingMessage(false))
                        dispatch(setErrorMessage(false))
                    })
                    .catch((error) => {
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

    useEffect(() => {
        dispatch(setLoadingMessage(false))
        //dispatch(setErrorMessage(false))
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
                contentContainerStyle={{ ...fullStyles?.scrollView }}>
                <Layout style={{ ...fullStyles?.layout }}>
                    <View style={{ ...fullStyles?.view }}>
                        <View style={{ ...fullStyles.section.full }}>
                            <Text category='h6' style={{ ...fullStyles?.h6 }}>ACCEDE A</Text>
                            <Text category='h1' style={{ ...fullStyles?.h1 }}>EXPERT GARDEN</Text>

                            <Input
                                style={{ ...fullStyles?.inputs?.input }}
                                label='Correo electrónico'
                                placeholder='Introduce tu correo electrónico'
                                value={values?.email || ''}
                                accessoryRight={renderKeyboardIcon}
                                onChangeText={text => handleChange(text, "email")}
                            />
                            <Input
                                style={{ ...fullStyles?.inputs?.input, marginBottom: 30 }}
                                label='Contraseña'
                                placeholder='Introduce tu contraseña'
                                value={values?.password || ''}
                                accessoryRight={renderEyeIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={text => handleChange(text, "password")}
                            />

                            <Button style={{ ...fullStyles?.button }} onPress={() => Login()}>ACCEDER</Button>

                            <Button style={{ ...fullStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("SignUp")}>¿Necesitas una cuenta?</Button>

                            <Button style={{ ...fullStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("RememberPass")}>¿Has olvidado la contraseña?</Button>

                            <View style={{ alignItems: 'center' }}>
                                <LeafIcon width={180} height={60} style={{ ...fullStyles?.leaf }} />
                            </View>
                        </View>
                    </View>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    )


}

LoginScreen.propTypes = {
    debug: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};

LoginScreen.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};