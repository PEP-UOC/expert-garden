import React, { useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage, setLoggedIn } from '../../store/root/rootAction';
import { addUser } from '../../store/user/userAction';

//Components
import { View, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Button, Layout, Input, Icon } from '@ui-kitten/components';

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
		<TouchableWithoutFeedback onPress={toggleSecureEntry} onClick={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	//Handle
	function handleChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value?.trim()
			}
		})
	}

	//Login
	function Login() {

		const { email, password } = values

		dispatch(setLoadingMessage(debug ? '🔧 Accediendo' : 'Accediendo'))

		auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				console.info('🔑 LOGI - Logged In!', user.user.email);
				dispatch(addUser(user))
				dispatch(setErrorMessage(false))
				dispatch(setLoggedIn(true))
			})
			.catch((error) => {
				console.error(error.message);
				dispatch(setLoggedIn(false))
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
			});
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles?.scrollView, ...ownStyles?.scrollHeight }}>
							<Layout style={{ ...gloStyles?.layout }}>
								<View style={{ ...gloStyles?.view }}>
									<View style={{ ...gloStyles.section.full }}>
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

										<Button style={{ ...gloStyles?.button }} onPress={() => Login()}>ACCEDER</Button>

										<Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("SignUp")}>¿Necesitas una cuenta?</Button>

										<Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={() => navigation.navigate("RememberPass")}>¿Has olvidado la contraseña?</Button>

										<View style={{ alignItems: 'center' }}>
											<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
										</View>
									</View>
								</View>
							</Layout>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
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
