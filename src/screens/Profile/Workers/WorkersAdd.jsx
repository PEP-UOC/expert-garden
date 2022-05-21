import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../../store/root/rootAction';

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { WorkerDataForm } from './components/WorkerData'
//import { DetailsList } from './components/DetailsList'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

//Icons
import { SaveIcon } from '../../../assets/icons/Save'

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

//uuid
import uuid from 'react-native-uuid';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../../common/firebaseErrorCodeMap';

const firebaseConfig = {
	apiKey: Constants.manifest.extra.firebaseApiKey,
	authDomain: Constants.manifest.extra.firebaseAuthDomain,
	projectId: Constants.manifest.extra.firebaseProjectId,
	storageBucket: Constants.manifest.extra.firebaseStorageBucket,
	messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
	appId: Constants.manifest.extra.firebaseAppId,
	measurementId: Constants.manifest.extra.firebaseMeasurementId,
};

// eslint-disable-next-line no-unused-vars
export const WorkersAddScreen = ({ debug, navigation, route }) => {
	const dispatch = useDispatch()

	//Firebase
	const firestore = firebase.firestore;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//State
	// eslint-disable-next-line no-unused-vars
	const [pass, setPass] = useState(uuid.v4())
	const [values, setValues] = useState({
		name: "",
		surnames: "",
		role: "worker",
		email: "",
		phoneNumber: "",
		password: pass,
		password2: pass,
		cid: user?.metadata?.cid
	})

	const resetForm = () => {
		const newPass = uuid.v4()
		setPass(newPass)
		consola('normal', `🕳  WADD - Dispatch Loading STOP`);
		dispatch(setLoadingMessage(false));
		setValues({
			name: "",
			surnames: "",
			role: "worker",
			email: "",
			phoneNumber: "",
			password: newPass,
			password2: newPass,
			cid: user?.metadata?.cid
		})
		setSaved(false)
	};

	//Handle
	const handleChange = (value, keyName) => {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
	}

	const [saved, setSaved] = useState(false);

	//SignUpWorker
	function SignUpWorker() {

		let appNewUser
		if (firebase?.apps?.find(app => app.name === 'newUser')) {
			appNewUser = firebase?.apps?.find(app => app.name === 'newUser')
		} else {
			appNewUser = firebase?.initializeApp(firebaseConfig, 'newUser');
		}

		const { email, phoneNumber, password, password2, name, surnames, role, cid } = values

		consola('normal', `🕳  WADD - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando!' : 'Guardando!'))

		if (!allFilled()) {
			if (password == password2) {
				appNewUser.auth().createUserWithEmailAndPassword(email, password)
					.then((user) => {
						consola('normal', '🚀 WADD - Worker Registered!');
						consola('normal', `🚀 WADD - ${user.user.email}`);
						appNewUser.auth().currentUser.sendEmailVerification()
							.then(() => {
								consola('normal', `🚀 WADD - Email verification sent to ${user.user.email}!`);
								appNewUser.auth().sendPasswordResetEmail(user.user.email)
									.then(() => {
										consola('normal', `🚀 WADD - Email reset pass sent to ${user.user.email}!`);
										firestore().collection("users").doc(appNewUser.auth()?.currentUser?.uid).set({
											uid: appNewUser.auth()?.currentUser?.uid,
											role,
											cid,
											verified: false,
											metadata: {
												name,
												surnames,
												fullname: `${name} ${surnames}`,
												email,
												phoneNumber,
												photoCounter: 0,
												cid,
											}
										})
											.then(() => {
												appNewUser.auth().currentUser.updateProfile({
													displayName: `${name} ${surnames}`
												}).then(() => {
													setSaved(true)
													dispatch(setLoadingMessage(false))
													dispatch(setErrorMessage(false))
													appNewUser.auth().signOut();
												}).catch((error) => {
													consola('error', `🩸 ERROR - ${error.message}`);
													consola('normal', `🕳  WADD - Dispatch Loading STOP`)
													dispatch(setLoadingMessage(false))
													dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
													appNewUser.auth().signOut();
												});
											})
											.catch((error) => {
												consola('error', `🩸 ERROR - ${error.message}`);
												consola('normal', `🕳  WADD - Dispatch Loading STOP`)
												dispatch(setLoadingMessage(false))
												dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
												appNewUser.auth().signOut();
											});
									});
							});
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('normal', `🕳  WADD - Dispatch Loading STOP`)
						dispatch(setLoadingMessage(false))
						dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code, 'workersAdd')} || ${error.message}` : firebaseErrorCodeMap(error.code, 'workersAdd')))
						appNewUser.auth().signOut();
					});
			} else {
				consola('normal', `🕳  WADD - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage('Las contraseñas no coinciden'))
			}
		} else {
			consola('normal', `🕳  WADD - Dispatch Loading STOP`)
			dispatch(setLoadingMessage(false))
			dispatch(setErrorMessage('Rellena todos los campos'))
		}
	}

	//Checks
	function allFilled() {
		return values?.name === '' || values?.surnames === '' && values?.phoneNumber === '' || values?.role === '' || values?.email === '' || values?.password === '' || values?.password2 === ''
	}

	//Navigation
	const navigateToWorkersList = () => {
		resetForm()
		navigation.navigate("WorkersListScreen");
	};

	useEffect(() => {
		dispatch(setErrorMessage(false))
	}, []);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop title={'Añadir nuevo empleado'} />
					<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={'sun-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 } }} primaryText={'Nuevo empleado'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>
										{!Device.isPhone && <BtnPrimary size={'medium'} disabled={allFilled()} icon={SaveIcon} text={"Añadir empleado"} onPress={SignUpWorker} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>
								</View>

								<View style={{ ...gloStyles.section.secondary }}>
									<WorkerDataForm cid={user?.metadata?.cid || ''} values={values} handleChange={handleChange} />

									{Device.isPhone && <BtnPrimary size={'small'} disabled={allFilled()} icon={SaveIcon} text={"Añadir empleado"} onPress={SignUpWorker} btnStyle={{ marginBottom: 0, marginTop: 0 }} />}

									<NavigationBackButton show={Device.isPhone} />
								</View>

								{/*MODAL DETALLE GUARDADO*/}
								<ModalOptions mainText={'¡Usuario registrado!'} show={saved} setShow={setSaved} option1text={'Añadir otro empleado'} option1onPress={resetForm} option2text={'Ver listado de empleados'} option2onPress={navigateToWorkersList} backdropPress={() => { return }} />
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

WorkersAddScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

WorkersAddScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
