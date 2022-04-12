import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch, useSelector } from 'react-redux'
import { setValidatingMessage, setErrorMessage } from '../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback } from 'react-native'
import { Text, Button, Layout, Input, Spinner, Icon } from '@ui-kitten/components';
import Anchor from '../../components/Anchor/Anchor'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

//Linking
import * as Linking from 'expo-linking';

//Device
import Device from '../../libs/react-native-device-detection';

// eslint-disable-next-line no-unused-vars
export const ValidatingScreen = ({ debug, mode, actionCode }) => {
    const dispatch = useDispatch()

    //State
    const [isValidating, setIsValidating] = useState(false)
    const [isActionCodeValid, setIsActionCodeValid] = useState(false)
    const [isPassResetValid, setIsPassResetValid] = useState(false)
    const [redirectURL, setRedirectURL] = useState('')
    const [values, setValues] = useState({
        email: "",
        password: "",
        password2: ""
    })

    //Handle
    function handleChange(value, keyName) {
        setValues(prevValues => {
            return {
                ...prevValues,
                [keyName]: value
            }
        })
    }

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

    //Loading
    const validatingMessage = useSelector(state => state.rootReducer.validatingMessage);

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    //Firebase
    const auth = firebase.auth;

    useEffect(() => {

        console.log('mode', mode)
        console.log('actionCode', actionCode)

        setIsValidating(true);
        switch (mode) {
            case 'verifyEmail':
                auth().applyActionCode(actionCode).then(() => {
                    // Email address has been verified.
                    dispatch(setValidatingMessage('Gracias! Email verificado!'))
                    setIsActionCodeValid(true)
                }).catch((error) => {
                    //console.log('error', error)
                    dispatch(setErrorMessage(
                        debug
                            ? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
                            : firebaseErrorCodeMap(error.code)
                    ))
                    dispatch(setValidatingMessage('No hemos podido validar tu email...'))
                    setIsActionCodeValid(false)
                }).finally(() => {
                    console.log('Device', Device)
                    let redirectURL = Linking.createURL('/', {});
                    if (Device.isPhone) {
                        redirectURL = 'exp://192.168.1.65:19000'
                    }
                    setRedirectURL(redirectURL);
                    setIsValidating(false);
                });
                break;
            case 'resetPassword':
                auth().verifyPasswordResetCode(actionCode).then((email) => {
                    // Email address has been verified.
                    handleChange(email, "email")
                    dispatch(setValidatingMessage('Introduce tu nueva contraseña'))
                    setIsActionCodeValid(true)
                }).catch((error) => {
                    //console.log('error', error)
                    dispatch(setErrorMessage(
                        debug
                            ? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
                            : firebaseErrorCodeMap(error.code)
                    ))
                    dispatch(setValidatingMessage('No hemos podido validar tu código de recuperación de contraseña...'))
                    setIsActionCodeValid(false)
                }).finally(() => {
                    console.log('Device', Device)
                    let redirectURL = Linking.createURL('/', {});
                    if (Device.isPhone) {
                        redirectURL = 'exp://192.168.1.65:19000'
                    }
                    setRedirectURL(redirectURL);
                    setIsValidating(false);
                });
                break;
        }

    }, [])

    const resetPass = () => {
        setIsValidating(true);
        auth().confirmPasswordReset(actionCode, values.password).then(() => {
            dispatch(setValidatingMessage('Contraseña modificada!'))
            setIsPassResetValid(true)
        }).catch((error) => {
            //console.log('error', error)
            dispatch(setErrorMessage(
                debug
                    ? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
                    : firebaseErrorCodeMap(error.code)
            ))
            dispatch(setValidatingMessage('No hemos podido modificar tu contraseña...'))
            setIsPassResetValid(false)
        }).finally(() => {
            setIsValidating(false);
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
                contentContainerStyle={{ ...fullStyles.scrollView }}>
                <Layout style={{ ...fullStyles.layout }}>
                    <View style={{ ...fullStyles.splashScreen }}>
                        <Text category='h2' style={{ ...fullStyles?.h2 }}>
                            {validatingMessage}
                        </Text>
                        {
                            mode === 'verifyEmail' ?
                                isValidating
                                    ? <Spinner size='giant' />
                                    : <Anchor href={redirectURL}>{isActionCodeValid ? 'ACCEDER' : 'ACCEDER DE NUEVO'}</Anchor>
                                : mode === 'resetPassword'
                                    ? isValidating
                                        ? <Spinner size='giant' />
                                        : isPassResetValid
                                            ? <Anchor href={redirectURL}>{'ACCEDER'}</Anchor>
                                            : (
                                                <>
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
                                                        style={{ ...fullStyles.inputs.input, marginBottom: 30 }}
                                                        label='Contraseña'
                                                        placeholder='Confirma la contraseña'
                                                        value={values?.password2 || ''}
                                                        accessoryRight={renderEyeIcon}
                                                        secureTextEntry={secureTextEntry}
                                                        onChangeText={text => handleChange(text, "password2")}
                                                    />

                                                    <Button style={{ ...fullStyles?.button }} onPress={() => resetPass()} disabled={values.password === '' || values.password2 === ''}>Crear nueva contraseña</Button>
                                                </>
                                            )
                                    : null
                        }

                        <View style={{ alignItems: 'center' }}>
                            <LeafIcon width={180} height={60} style={{ ...fullStyles?.leaf }} />
                        </View>
                    </View>
                </Layout >
            </ScrollView>
        </SafeAreaView>
    )
};

ValidatingScreen.propTypes = {
    debug: PropTypes.bool.isRequired,
    mode: PropTypes.string,
    actionCode: PropTypes.string
};

ValidatingScreen.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};