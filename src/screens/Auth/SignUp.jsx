import React, { useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setLoggedIn, setLoadingMessage, setErrorMessage } from '../../store/root/rootAction';
import { addUser } from '../../store/user/userAction';

//Components
import { View, SafeAreaView, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Button, Layout, Input, Icon, Select, SelectItem, IndexPath } from '@ui-kitten/components';
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

//Moment
import moment from 'moment';

import registerForPushNotificationsAsync from '../../libs/registerForPushNotificationsAsync'

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
		<TouchableWithoutFeedback onPress={toggleSecureEntry} onClick={toggleSecureEntry}
			accessible={true}
			accessibilityLabel="Mostrar contraseña"
			accessibilityHint="Mostrar contraseña">
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

		consola('normal', `🕳  SNUP - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Registrándote!' : 'Registrándote!'))

		if (!allFilled()) {
			if (password == password2) {
				registerForPushNotificationsAsync().then(pushToken => {
					auth().createUserWithEmailAndPassword(email.trim(), password.trim())
						.then((user) => {
							consola('normal', '🚀 SNUP - Registered!');
							consola('normal', `🚀 SNUP - ${user.user.email}`);
							consola('normal', `🚀 SNUP - ${pushToken}`);
							auth().currentUser.sendEmailVerification()
								.then(() => {
									consola('normal', '🚀 SNUP - Email verification sent!');
									dispatch(addUser(user))

									if (role === 'business') {
										const refCompany = firestore().collection('companies').doc();
										firestore().collection("users").doc(auth()?.currentUser?.uid).set({
											uid: auth()?.currentUser?.uid,
											role,
											pushToken: pushToken || '',
											verified: false,
											metadata: {
												name: name.trim(),
												surnames: surnames.trim(),
												fullname: `${name.trim()} ${surnames.trim()}`,
												email: email.trim(),
												photoCounter: 0,
												cid: refCompany.id,
												hasWorkers: false,
											}
										})
											.then(() => {
												auth().currentUser.updateProfile({
													displayName: `${name.trim()} ${surnames.trim()}`,
												}).then(() => {
													const now = moment();
													const creationDateTime = now.format();
													firestore()
														.collection('companies')
														.doc(refCompany.id)
														.set({
															cid: refCompany.id,
															uid: auth()?.currentUser?.uid,
															name: name.trim(),
															creationDateTime,
															pushToken: pushToken || '',
														})
														.then(() => {
															dispatch(setLoggedIn(true))
															dispatch(setErrorMessage(false))
															dispatch(setLoadingMessage(false))
														})
														.catch((error) => {
															consola('error', `🩸 ERROR - ${error.message}`);
															dispatch(setLoggedIn(false))
															consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
															dispatch(setLoadingMessage(false))
															dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
														});
												}).catch((error) => {
													consola('error', `🩸 ERROR - ${error.message}`);
													dispatch(setLoggedIn(false))
													consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
													dispatch(setLoadingMessage(false))
													dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
												});
											})
											.catch((error) => {
												consola('error', `🩸 ERROR - ${error.message}`);
												dispatch(setLoggedIn(false))
												consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
												dispatch(setLoadingMessage(false))
												dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
											});
									} else {
										firestore().collection("users").doc(auth()?.currentUser?.uid).set({
											uid: auth()?.currentUser?.uid,
											role,
											pushToken: pushToken || '',
											verified: false,
											metadata: {
												name: name.trim(),
												surnames: surnames.trim(),
												fullname: `${name.trim()} ${surnames.trim()}`,
												email: email.trim(),
												photoCounter: 0,
											}
										})
											.then(() => {
												auth().currentUser.updateProfile({
													displayName: `${name.trim()} ${surnames.trim()}`,
												}).then(() => {
													dispatch(setLoggedIn(true))
													dispatch(setErrorMessage(false))
													dispatch(setLoadingMessage(false))
												}).catch((error) => {
													consola('error', `🩸 ERROR - ${error.message}`);
													dispatch(setLoggedIn(false))
													consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
													dispatch(setLoadingMessage(false))
													dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
												});
											})
											.catch((error) => {
												consola('error', `🩸 ERROR - ${error.message}`);
												dispatch(setLoggedIn(false))
												consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
												dispatch(setLoadingMessage(false))
												dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
											});
									}
								});
						})
						.catch((error) => {
							consola('error', `🩸 ERROR - ${error.message}`);
							dispatch(setLoggedIn(false))
							consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
							dispatch(setLoadingMessage(false))
							dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
						});
				});
			} else {
				dispatch(setLoggedIn(false))
				consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage('Las contraseñas no coinciden'))
			}
		} else {
			dispatch(setLoggedIn(false))
			consola('normal', `🕳  SNUP - Dispatch Loading STOP`)
			dispatch(setLoadingMessage(false))
			dispatch(setErrorMessage('Rellena todos los campos'))
		}
	}

	//Checks
	function allFilled() {
		return values?.name === '' || (values?.surnames === '' && values?.role === 'client') || values?.role === '' || values?.email === '' || values?.password === '' || values?.password2 === ''
	}

	//Select
	const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
	const displayValue = userTypes[selectedIndex.row].value;
	const renderOption = (title) => (
		<SelectItem key={title} title={title} />
	);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen />
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.fullStart }}>

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
									/>
									{values.role === 'client' &&
										<Input
											style={{ ...gloStyles.inputs.input }}
											label={'Apellidos'}
											placeholder={'Introduce tus apellidos'}
											value={values?.surnames || ''}
											onChangeText={text => handleChange(text, "surnames")}
										/>
									}
									<Input
										style={{ ...gloStyles.inputs.input }}
										label='Correo electrónico'
										placeholder='Introduce tu correo electrónico'
										value={values?.email || ''}
										onChangeText={text => handleChange(text, "email")}
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

									<Button style={{ ...gloStyles?.button, marginBottom: 20 }} onPress={() => SignUp()}>REGISTRARSE</Button>

									<Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("Login")}>¿Ya tienes cuenta?</Button>

									<View style={{ alignItems: 'center' }}>
										<LeafIcon width={180} height={60} style={{ ...gloStyles.leaf }} />
									</View>
								</View>
							</View>
						</Layout >
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>)
}

SignUpScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

SignUpScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
