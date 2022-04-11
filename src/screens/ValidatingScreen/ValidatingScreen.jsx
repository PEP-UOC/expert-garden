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
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Layout, Text, Spinner } from '@ui-kitten/components';
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
    const [isValidated, setIsValidated] = useState(false)
    const [isValidating, setIsValidating] = useState(false)
    const [redirectURL, setRedirectURL] = useState('')

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
        auth().applyActionCode(actionCode).then(() => {
            // Email address has been verified.
            dispatch(setValidatingMessage('Gracias! Email verificado!'))
            setIsValidated(true)
        }).catch((error) => {
            //console.log('error', error)
            dispatch(setErrorMessage(
                debug
                    ? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
                    : firebaseErrorCodeMap(error.code)
            ))
            dispatch(setValidatingMessage('No hemos podido validar tu email...'))
            setIsValidated(false)
        }).finally(() => {
            let redirectURL = Linking.createURL('/', {});
            if (Device.isPhoneOrTablet) {
                redirectURL = 'exp://192.168.1.65:19000'
            }
            setRedirectURL(redirectURL);
            setIsValidating(false);
        });
    }, [])

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
                            isValidating
                                ? <Spinner size='giant' />
                                : <Anchor href={redirectURL}>{isValidated ? 'ACCEDER' : 'ACCEDER DE NUEVO'}</Anchor>
                        }

                        <View style={{ alignItems: 'center' }}>
                            <LeafIcon width={360} height={120} style={{ ...fullStyles?.leaf }} />
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