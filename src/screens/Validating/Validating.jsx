import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';

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
import BtnExternalLink from '../../components/Buttons/ExternalLink'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

//Linking
import * as Linking from 'expo-linking';

//Device
import Device from '../../libs/react-native-device-detection';

// eslint-disable-next-line no-unused-vars
export const ValidatingScreen = ({ debug, route }) => {
	const dispatch = useDispatch()

	const mode = route?.params?.mode || '';
	const actionCode = route?.params?.actionCode || '';

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
			<Text style={{ ...gloStyles.inputs.captionText }}>Utiliza un mínimo de 6 carácteres</Text>
		)
	}

	//Loading
	const validatingMessage = useSelector(state => state.rootReducer.validatingMessage);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Firebase
	const auth = firebase.auth;

	useEffect(() => {

		consola('normal', `🚨 VALI - mode ${mode}`)
		consola('normal', `🚨 VALI - actionCode ${actionCode}`)

		setIsValidating(true);
		switch (mode) {
			case 'verifyEmail':
				auth().applyActionCode(actionCode).then(() => {
					// Email address has been verified.
					dispatch(setValidatingMessage('Gracias! Email verificado!'))
					setIsActionCodeValid(true)
				}).catch((error) => {
					consola('error', '🩸 VALI - error')
					consola('error', error)
					dispatch(setErrorMessage(
						debug
							? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
							: firebaseErrorCodeMap(error.code)
					))
					dispatch(setValidatingMessage('No hemos podido validar tu email...'))
					setIsActionCodeValid(false)
				}).finally(() => {
					consola('normal', '💻 VALI - Device')
					consola('normal', Device)
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
					consola('error', '🩸 VALI - error')
					consola('error', error)
					dispatch(setErrorMessage(
						debug
							? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
							: firebaseErrorCodeMap(error.code)
					))
					dispatch(setValidatingMessage('No hemos podido validar tu código de recuperación de contraseña...'))
					setIsActionCodeValid(false)
					setIsPassResetValid(false)
				}).finally(() => {
					consola('normal', '💻 VALI - Device')
					consola('normal', Device)
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
			consola('error', '🩸 VALI - error')
			consola('error', error)
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
				contentContainerStyle={{ ...gloStyles.scrollView }}>
				<Layout style={{ ...gloStyles.layout }}>
					<View style={{ ...ownStyles.view }}>
						<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.title }}>
							{validatingMessage}
						</Text>
						{
							mode === 'verifyEmail' ?
								isValidating
									? <Spinner size='giant' />
									: <BtnExternalLink href={redirectURL}>{isActionCodeValid ? 'ACCEDER' : 'ACCEDER DE NUEVO'}</BtnExternalLink>
								: mode === 'resetPassword'
									? isValidating
										? <Spinner size='giant' />
										: isActionCodeValid
											? isPassResetValid
												? <BtnExternalLink href={redirectURL}>{'ACCEDER'}</BtnExternalLink>
												: (
													<>
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

														<Button style={{ ...gloStyles?.button }} onPress={() => resetPass()} disabled={values.password === '' || values.password2 === ''}>Crear nueva contraseña</Button>
													</>
												)
											: <BtnExternalLink href={redirectURL}>{'ACCEDER DE NUEVO'}</BtnExternalLink>
									: null
						}

						<View style={{ alignItems: 'center' }}>
							<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
						</View>
					</View>
				</Layout >
			</ScrollView>
		</SafeAreaView>
	)
};

ValidatingScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	route: PropTypes.object.isRequired,
};

ValidatingScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
