import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';

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

	//State
	const [email, setEmail] = useState("")

	//Password reset
	const sendResetEmail = (auth) => {
		consola('normal', `🕳  RMPA - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Enviando' : 'Enviando'));
		auth()?.sendPasswordResetEmail(email)
			.then(() => {
				setPassCounter(240);
			})
			.catch((error) => {
				consola('error', `🩸 ERROR - ${error.message}`);
				consola('normal', `🕳  RMPA - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
			})
			.finally(() => {
				consola('normal', `🕳  RMPA - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
			});
	};

	//Send email counter
	const [passCounter, setPassCounter] = useState(0);
	useEffect(() => {
		const timer =
			passCounter > 0 && setInterval(() => setPassCounter(passCounter - 1), 1000);
		return () => clearInterval(timer);
	}, [passCounter]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
				contentContainerStyle={{ ...gloStyles?.scrollView, ...ownStyles?.scrollHeight }}>
				<Layout style={{ ...gloStyles?.layout }}>
					<View style={{ ...gloStyles?.view }}>
						<View style={{ ...gloStyles.section.fullCentered }}>
							<Text category='h6' style={{ ...gloStyles?.h6, ...ownStyles?.topSubTitle }}>RESTABLECER</Text>
							<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle }}>CONTRASEÑA</Text>
							<Input
								style={{ ...gloStyles?.inputs?.input }}
								label='Correo electrónico'
								placeholder='Introduce tu correo electrónico'
								value={email || ''}
								onChangeText={text => setEmail(text)}
							/>

							<Button style={{ ...gloStyles?.button }} onPress={() => sendResetEmail(auth)} disabled={passCounter > 0 || email === ''}>Enviar email de recuperación</Button>
							{passCounter > 0 &&
								<>
									<Text category='c1' style={{ ...gloStyles?.smallText }}>Te hemos enviado un email con las instrucciones para restablecer tu contraseña.</Text>
									<Text category='c1' style={{ ...gloStyles?.smallText }}>Espera {passCounter}s. para enviar un nuevo email de recuperación.</Text>
								</>}

							<Button style={{ ...gloStyles?.buttonGhost, marginTop: 20 }} appearance='ghost' onPress={() => navigation.pop()}>Volver</Button>

							<View style={{ alignItems: 'center' }}>
								<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
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
