import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage, setLoggedIn } from '../../store/root/rootAction';

//Data
import mainServices from '../../data/mainServices.json'

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Layout, Button, TopNavigation } from '@ui-kitten/components';
import { TitleScreen } from '../../components/Titles/Screen'
import { SeparatorTopScreen } from '../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../components/Separators/TopSection'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

//Moment
import moment from "moment";

// eslint-disable-next-line no-unused-vars
export const MainServiceRequestScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [needsPreviousVisit, setNeedsPreviousVisit] = useState(false);
	const [needsDesign, setNeedsDesign] = useState(false);
	const [isRecurrent, setIsRecurrent] = useState(false);
	const [isFinalized, setIsFinalized] = useState(false);

	//Actions
	const submitService = (type, comment) => {
		const now = moment();
		const requestDateTime = now.format();
		const requestDate = now.format("DD-MM-YYYY");
		const requestTime = now.format("HH:mm");
		const ref = firestore().collection("services").doc();
		firestore().collection("services").doc(ref.id).set({
			sid: ref.id,
			uid: auth()?.currentUser?.uid,
			type,
			comment,
			requestDateTime,
			requestDate,
			requestTime,
			needsPreviousVisit,
			needsDesign,
			confirmationDateTime: null,
			confirmationDate: null,
			confirmationTime: null,
			serviceDateTime: null,
			serviceDate: null,
			serviceTime: null,
			isRecurrent,
			isFinalized,
			price: null,
			isPaid: false,
			cancelationDateTime: null,
			cancelationDate: null,
			cancelationTime: null,
			cancelationReason: null,
		})
			.then(() => {
				// Añadir a firestore service details relacionadas con el sid
				// Añadir a firestore proposed dates relacionadas con el sid
				// Añadir a firestore selected companies relacionadas con el sid
				navigation.navigate('Home')
			})
			.catch((error) => {
				console.error(error.message);
				dispatch(setLoggedIn(false))
				console.log(`🕳  MSRQ - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
			});
	};
	const submitNotification = (type, content) => {
		const now = moment();
		const ref = firestore().collection("notifications").doc();
		const sendDateTime = now.format();
		const sendDate = now.format("DD-MM-YYYY");
		const sendTime = now.format("HH:mm");
		firestore().collection("notifications").doc(ref.id).set({
			nid: ref.id,
			uidSender: auth()?.currentUser?.uid,
			uidReceiver: auth()?.currentUser?.uid,
			type,
			content,
			sendDateTime,
			sendDate,
			sendTime,
			readDateTime: null,
			readDate: null,
			readTime: null,
		})
			.then(() => {
				// Añadir a firestore links relacionados con el nid
				// Añadir a firestore proposed dates relacionadas con el sid
				// Añadir a firestore selected companies relacionadas con el sid
				navigation.navigate('Home')
			})
			.catch((error) => {
				console.error(error.message);
				dispatch(setLoggedIn(false))
				console.log(`🕳  MSRQ - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
			});
	};
	const submitGarden = (name, description) => {
		const now = moment();
		const ref = firestore().collection("gardens").doc();
		const creationDateTime = now.format();
		const creationDate = now.format("DD-MM-YYYY");
		const creationTime = now.format("HH:mm");
		firestore().collection("gardens").doc(ref.id).set({
			gid: ref.id,
			uid: auth()?.currentUser?.uid,
			name,
			description,
			creationDateTime,
			creationDate,
			creationTime,
			address: 'AAA',
			addressExtra: 'BBB',
			postalCode: 'CCC',
			province: 'DDD',
			town: 'EEE',
			details: [],
			imageCounter: 0,
			images: []
		})
			.then(() => {
				// Añadir a firestore links relacionados con el nid
				// Añadir a firestore proposed dates relacionadas con el sid
				// Añadir a firestore selected companies relacionadas con el sid
				navigation.navigate('Profile')
			})
			.catch((error) => {
				console.error(error.message);
				dispatch(setLoggedIn(false))
				console.log(`🕳  MSRQ - Dispatch Loading STOP`)
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
			});
	};

	useEffect(() => {
		console.log(`🕳  MSRQ - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<TopNavigation title={'Solicita un servicio'} alignment='center' />
						<Divider />
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles.scrollView }}>
							<Layout style={{ ...gloStyles.layout }}>
								<SeparatorTopScreen />
								<View style={{ ...gloStyles.view }}>
									<View style={{ ...gloStyles.section.primary }}>
										<TitleScreen icon={'plus-circle-outline'} primaryText={'Solicita un servicio'} secondaryText={''} />
									</View>
									<View style={{ ...gloStyles.section.secondary }}>
										<SeparatorTopSection />
										{mainServices.map(service => {
											return (<Button style={{ ...gloStyles?.button, ...ownStyles?.btnServiceRequest }}
												key={service.id} onPress={() => submitService(service.identifier, `Test ${Math.random() * (1000 - 1) + 1}`)} >
												{service.label}
											</Button>)
										})}
										<Button style={{ ...gloStyles?.button, ...ownStyles?.btnServiceRequest }}
											key={'notification'} onPress={() => submitNotification('PUSH', `Test ${Math.random() * (1000 - 1) + 1}`)} >
											CREAR NOTIFICACIÓN
										</Button>
										<Button style={{ ...gloStyles?.button, ...ownStyles?.btnServiceRequest }}
											key={'garden.chalet'} onPress={() => submitGarden('CHALET', `Test ${Math.random() * (1000 - 1) + 1}`)} >
											CREAR JARDÍN CHALET
										</Button>
										<Button style={{ ...gloStyles?.button, ...ownStyles?.btnServiceRequest }}
											key={'garden.casa'} onPress={() => submitGarden('CASA', `Test ${Math.random() * (1000 - 1) + 1}`)} >
											CREAR JARDÍN CASA
										</Button>
									</View>
								</View>
							</Layout>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

MainServiceRequestScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

MainServiceRequestScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
