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
import { updateUser, removeUserTemporal } from '../../../store/user/userAction';

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { ImgClient } from '../../../components/Images/Client'
import { PersonalDataForm } from './components/PersonalData'
import { GardensDataForm } from './components/GardensData'
import { BankDataForm } from './components/BankData'

//Icons
import { AddIcon } from '../../../assets/icons/Add'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../../common/firebaseErrorCodeMap';

// eslint-disable-next-line no-unused-vars
export const MainProfileScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const userTemporal = useSelector(state => state.userReducer.userTemporal);
	const hasNotSavedChanges = useSelector(state => state.userReducer.hasNotSavedChanges);

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

		firestore().collection("users").doc(auth().currentUser.uid).update({
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

					auth().onAuthStateChanged((updatedUser) => {
						if (updatedUser) {
							dispatch(updateUser(
								{
									metadata,
									bankDetails,
									user: updatedUser
								}
							))
							dispatch(setLoadingMessage(false))
							dispatch(setErrorMessage(false))
							console.log('🧹 Limpiando UserTemporal')
							dispatch(removeUserTemporal())
						}
					});

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

	useEffect(() => {
		console.log('🧹 Limpiando UserTemporal')
		dispatch(removeUserTemporal())
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<TopNavigation title={'Perfil'} alignment='center' />
						<Divider />
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles.scrollView }}>
							<Layout style={{ ...gloStyles.layout }}>
								<SeparatorTopScreen />
								<View style={{ ...gloStyles.view }}>
									<View style={{ ...gloStyles.section.primary }}>
										<TitleScreen icon={'person-outline'} primaryText={user?.metadata?.name || ''} secondaryText={''} />
										<ImgClient />
										{
											{
												'client': (
													<>
														{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
													</>
												),
												'business': (
													<>
														{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
													</>
												),
												'worker': (
													<>
														{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
													</>
												)
											}[user?.role]
										}
									</View>
									<View style={{ ...gloStyles.section.secondary }}>
										<SeparatorTopSection />
										{
											{
												'client': (
													<>
														<PersonalDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}

														<GardensDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}

														<BankDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
													</>
												),
												'business': (
													<>
														<PersonalDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
													</>
												),
												'worker': (
													<>
														<PersonalDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
													</>
												)
											}[user?.role]
										}
									</View>
								</View>
							</Layout>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView >
	)
};

MainProfileScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

MainProfileScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
