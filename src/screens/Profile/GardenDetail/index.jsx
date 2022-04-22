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
import { updateUser } from '../../../store/user/userAction';
import { removeGardenTemporal } from '../../../store/garden/gardenAction';

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { ImgWithPicker } from '../../../components/Images/WithPicker'
import { GardenDataForm } from './components/GardenData'

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { BackIcon } from '../../../assets/icons/Back'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../../common/firebaseErrorCodeMap';

//Lodash
import { toLower, upperFirst } from 'lodash';

//Hooks
import useGetOne from '../../../hooks/useGetOne'

// eslint-disable-next-line no-unused-vars
export const GardenDetailScreen = ({ debug, navigation, route }) => {
	const gid = route.params.gid;

	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const gardenTemporal = useSelector(state => state.gardenReducer.gardenTemporal);
	const hasNotSavedChanges = useSelector(state => state.gardenReducer.hasNotSavedChanges);

	//Hooks
	const { loading: gardenLoading, result: garden, error: gardenError } = useGetOne(debug, 'gardens', 'gid', gid);

	const saveGardenChanges = () => {
		console.log('garden', garden)
		console.log('gardenTemporal', gardenTemporal)

		//Metadata
		const name = gardenTemporal?.metadata?.name || garden?.metadata?.name || '';
		const surnames = gardenTemporal?.metadata?.surnames || garden?.metadata?.surnames || '';
		const fullname = gardenTemporal?.metadata?.fullname || `${garden?.metadata?.name} ${garden?.metadata?.surnames}` || '';
		const email = gardenTemporal?.metadata?.email || garden?.metadata?.email || '';
		const phoneNumber = gardenTemporal?.metadata?.phoneNumber || garden?.metadata?.phoneNumber || '';
		const gender = gardenTemporal?.metadata?.gender || garden?.metadata?.gender || '';
		const birthday = gardenTemporal?.metadata?.birthday || garden?.metadata?.birthdayDateTime || '';
		const birthdayDateTime = gardenTemporal?.metadata?.birthdayDateTime || garden?.metadata?.birthdayDateTime || '';
		const metadata = {
			...garden.metadata,
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
		const cardNumber = gardenTemporal?.bankDetails?.cardNumber || garden?.bankDetails?.cardNumber || '';
		const cardExpiration = gardenTemporal?.bankDetails?.cardExpiration || garden?.bankDetails?.cardExpiration || '';
		const cardHolder = gardenTemporal?.bankDetails?.cardHolder || garden?.bankDetails?.cardHolder || '';
		const bankDetails = {
			...garden.bankDetails,
			cardNumber,
			cardExpiration,
			cardHolder
		}

		//Gardens
		const gardens = gardenTemporal?.gardens || [];

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
							dispatch(removeGardenTemporal())
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

	//Navigation
	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const navigateBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		console.log('🧹 Limpiando GardenTemporal')
		dispatch(removeGardenTemporal())
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		if (garden?.gid) {
			console.log(`🍀 Jardín ${gid}`, garden)
			dispatch(setLoadingMessage(false))
		}
	}, [garden]);

	useEffect(() => {
		if (gardenError) {
			console.log(`🩸 ${gardenError}`)
			dispatch(setErrorMessage(gardenError))
		}
	}, [gardenError]);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<TopNavigation title={'Jardín'} alignment='center' accessoryLeft={BackAction} />
						<Divider />
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles.scrollView }}>
							<Layout style={{ ...gloStyles.layout }}>
								<SeparatorTopScreen />
								<View style={{ ...gloStyles.view }}>
									<View style={{ ...gloStyles.section.primary }}>
										{garden?.gid && !gardenLoading ?
											(
												<>
													<TitleScreen icon={'person-outline'} primaryText={'Detalles de ' + upperFirst(toLower(garden?.type)) || ''} secondaryText={''} />
													<ImgWithPicker entity={garden} entityType={'garden'} />
													{
														{
															'client': (
																<>
																	{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveGardenChanges} />}
																</>
															),
															'business': (
																<>
																	{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveGardenChanges} />}
																</>
															),
															'worker': (
																<>
																	{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveGardenChanges} />}
																</>
															)
														}[user?.role]
													}
												</>
											)
											: null}
									</View>
									<View style={{ ...gloStyles.section.secondary }}>
										<SeparatorTopSection />
										{
											{
												'client': (
													<>
														<GardenDataForm gid={gid} />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveGardenChanges} />}
													</>
												),
												'business': (
													<>
														<GardenDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveGardenChanges} />}
													</>
												),
												'worker': (
													<>
														<GardenDataForm />
														{Platform.OS !== "web" && hasNotSavedChanges && <BtnPrimary size={'medium'} disabled={!hasNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveGardenChanges} />}
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
		</SafeAreaView>
	)
};

GardenDetailScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

GardenDetailScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
