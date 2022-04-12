import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';

import { View, SafeAreaView, ScrollView } from "react-native"
import { Text, Button, Layout, Input } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

// eslint-disable-next-line no-unused-vars
export const RememberPass = ({ debug, navigation }) => {
    const dispatch = useDispatch()

    //Firebase
    const auth = firebase.auth;

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    //State
    const [email, setEmail] = useState("")

    //Password reset
    const sendResetEmail = (auth) => {
        auth()?.sendPasswordResetEmail(email)
            .then(() => {
                setPassCounter(240);
            })
            .catch((error) => {
                console.error(error.message);
                dispatch(setLoadingMessage(false))
                dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
            });
    };

    //Send email counter
    const [passCounter, setPassCounter] = useState(0);
    useEffect(() => {
        const timer =
            passCounter > 0 && setInterval(() => setPassCounter(passCounter - 1), 1000);
        return () => clearInterval(timer);
    }, [passCounter]);

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
                            <Text category='h6' style={{ ...fullStyles?.h6 }}>RESTABLECER</Text>
                            <Text category='h1' style={{ ...fullStyles?.h1 }}>CONTRASEÑA</Text>
                            <Input
                                style={{ ...fullStyles?.inputs?.input }}
                                label='Correo electrónico'
                                placeholder='Introduce tu correo electrónico'
                                value={email || ''}
                                onChangeText={text => setEmail(text)}
                            />

                            <Button style={{ ...fullStyles?.button }} onPress={() => sendResetEmail(auth)} disabled={passCounter > 0 || email === ''}>Enviar email de recuperación</Button>
                            {passCounter > 0 &&
                                <>
                                    <Text category='c1' style={{ ...fullStyles?.smallText }}>Te hemos enviado un email con las instrucciones para restablecer tu contraseña.</Text>
                                    <Text category='c1' style={{ ...fullStyles?.smallText }}>Espera {passCounter}s. para enviar un nuevo email de recuperación.</Text>
                                </>}

                            <Button style={{ ...fullStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.pop()}>Volver</Button>

                            <View style={{ alignItems: 'center' }}>
                                <LeafIcon width={180} height={60} style={{ ...fullStyles?.leaf }} />
                            </View>
                        </View>
                    </View>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    )
};

RememberPass.propTypes = {
    debug: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};

RememberPass.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};