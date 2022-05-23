/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage, setLoggedIn, setPushToken } from '../../store/root/rootAction';
import { addUser } from '../../store/user/userAction';

//Components
import { View, SafeAreaView, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Button, Layout, Input, Icon } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../components/Separators/TopScreen'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

import registerForPushNotificationsAsync from '../../libs/registerForPushNotificationsAsync'

// eslint-disable-next-line no-unused-vars
export const LoginScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

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
		<TouchableWithoutFeedback onPress={toggleSecureEntry} onClick={toggleSecureEntry}
			accessible={true}
			accessibilityLabel="Mostrar contraseña"
			accessibilityHint="Mostrar contraseña"
		>
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

		consola('normal', `🕳  LOGI - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Accediendo' : 'Accediendo'))

		registerForPushNotificationsAsync().then(pushToken => {
			dispatch(setPushToken(pushToken))
			auth().signInWithEmailAndPassword(email.trim(), password.trim())
				.then((user) => {
					consola('normal', `🔑 LOGI - Logged In! ${user.user.email}`)
					dispatch(addUser(user))
					dispatch(setErrorMessage(false))
					dispatch(setLoggedIn(true))
				})
				.catch((error) => {
					consola('error', `🩸 ERROR - ${error.message}`);
					dispatch(setLoggedIn(false))
					consola('normal', `🕳  LOGI - Dispatch Loading STOP`)
					dispatch(setLoadingMessage(false))
					dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
				});
		});
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}
			accessible={true}
			accessibilityLabel="Login"
			accessibilityHint="Login"
		>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles?.scrollView }}>
						<Layout style={{ ...gloStyles?.layout }}>
							<SeparatorTopScreen />
							<View style={{ ...gloStyles?.view }}>
								<View style={{ ...gloStyles.section.fullCentered }}>
									<Text category='h6' style={{ ...gloStyles?.h6, ...ownStyles?.topSubTitle }}>ACCEDE A</Text>
									<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle }}>EXPERT GARDEN</Text>

									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='Correo electrónico'
										placeholder='Introduce tu correo electrónico'
										value={values?.email || ''}
										onChangeText={text => handleChange(text, "email")}
									/>
									<Input
										style={{ ...gloStyles?.inputs?.input, marginBottom: 30 }}
										label='Contraseña'
										placeholder='Introduce tu contraseña'
										value={values?.password || ''}
										accessoryRight={renderEyeIcon}
										secureTextEntry={secureTextEntry}
										onChangeText={text => handleChange(text, "password")}
									/>

									<Button style={{ ...gloStyles?.button, marginBottom: 20 }} onPress={() => Login()}>ACCEDER</Button>

									<Button style={{ ...gloStyles?.buttonGhost, marginBottom: 10 }} appearance='ghost' onPress={() => navigation.navigate("SignUp")}>¿Necesitas una cuenta?</Button>

									<Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("RememberPass")}>¿Has olvidado la contraseña?</Button>

									<View style={{ alignItems: 'center' }}>
										<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
									</View>
								</View>
							</View>
						</Layout>
					</ScrollView>
					<StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#31a060' translucent={false} />
				</View>
			</KeyboardAvoidingView>
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
