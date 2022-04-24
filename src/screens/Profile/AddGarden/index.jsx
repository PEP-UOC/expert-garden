import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../../store/root/rootAction';
import { removeUserTemporal } from '../../../store/user/userAction';

//Components
//import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
//import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
//import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
//import { SeparatorTopSection } from '../../../components/Separators/TopSection'
//import { TitleScreen } from '../../../components/Titles/Screen'
//import { BtnPrimary } from '../../../components/Buttons/Primary'
//import { ImgWithPicker } from '../../../components/Images/WithPicker'
//import { PersonalDataForm } from './components/PersonalData'
//import { GardensDataForm } from './components/GardensData'
//import { BankDataForm } from './components/BankData'

//Icons
//import { AddIcon } from '../../../assets/icons/Add'
import { BackIcon } from '../../../assets/icons/Back'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../../common/firebaseErrorCodeMap';

// eslint-disable-next-line no-unused-vars
export const AddGardenScreen = ({ debug, navigation, route }) => {
	const gardenInfo = route.params.garden;
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const userTemporal = useSelector(state => state.userReducer.userTemporal);
	//const hasNotSavedChanges = useSelector(state => state.userReducer.hasNotSavedChanges);

	const saveChanges = () => {
		//console.log('user', user)
		console.log('userTemporal', userTemporal)

		//Metadata
		const name = userTemporal?.metadata?.name || user?.metadata?.name || '';
		const surnames = userTemporal?.metadata?.surnames || user?.metadata?.surnames || '';
		const fullname = userTemporal?.metadata?.fullname || `${user?.metadata?.name} ${user?.metadata?.surnames}` || '';
		const email = userTemporal?.metadata?.email || user?.metadata?.email || '';
		const phoneNumber = userTemporal?.metadata?.phoneNumber || user?.metadata?.phoneNumber || '';
		const gender = userTemporal?.metadata?.gender || user?.metadata?.gender || '';
		const birthday = userTemporal?.metadata?.birthday || user?.metadata?.birthdayDateTime || '';
		const birthdayDateTime = userTemporal?.metadata?.birthdayDateTime || user?.metadata?.birthdayDateTime || '';
		const metadata = {
			...user.metadata,
			name,
			surnames,
			fullname,
			email,
			phoneNumber,
			gender,
			birthday,
			birthdayDateTime,
		};

		//Bank details
		const cardNumber = userTemporal?.bankDetails?.cardNumber || user?.bankDetails?.cardNumber || '';
		const cardExpiration = userTemporal?.bankDetails?.cardExpiration || user?.bankDetails?.cardExpiration || '';
		const cardHolder = userTemporal?.bankDetails?.cardHolder || user?.bankDetails?.cardHolder || '';
		const bankDetails = {
			...user.bankDetails,
			cardNumber,
			cardExpiration,
			cardHolder
		}

		//Gardens
		const gardens = userTemporal?.gardens || [];

		firestore().collection("users").doc(auth()?.currentUser?.uid).update({
			metadata,
			bankDetails
		})
			.then(() => {
				auth().currentUser.updateProfile({
					displayName: fullname,
				}).then(() => {
					const gardensList = gardens.filter(garden => garden?.gid && garden?.gid !== '')
					Promise.all(gardensList.map(async (garden) => {
						firestore().collection("gardens").doc(garden?.gid).update({
							address: garden?.address,
							addressExtra: garden?.addressExtra,
							postalCode: garden?.postalCode,
							province: garden?.province,
							town: garden?.town
						})
					}));

					dispatch(setLoadingMessage(false))
					dispatch(setErrorMessage(false))
					console.log('🧹 Limpiando UserTemporal')
					dispatch(removeUserTemporal())

				}).catch((error) => {
					console.error(error.message);
					dispatch(setLoadingMessage(false))
					dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
				});
			})
			.catch((error) => {
				console.error(error.message);
				dispatch(setLoadingMessage(false))
				dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
			});
	}

	//Navigation
	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const navigateBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		console.log('🧹 Limpiando UserTemporal')
		dispatch(removeUserTemporal())
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
		console.log('gardenInfo', gardenInfo)
	}, []);


	return (
		null
	)
};

AddGardenScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

AddGardenScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
