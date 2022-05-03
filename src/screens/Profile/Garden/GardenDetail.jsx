import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../../store/root/rootAction';

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { BtnSecondary } from '../../../components/Buttons/Secondary'
import { ImgWithPicker } from '../../../components/Images/WithPicker'
import { GardenDataForm } from './components/GardenData'
import { DetailsList } from './components/DetailsList'

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { SaveIcon } from '../../../assets/icons/Save'
import { BackIcon } from '../../../assets/icons/Back'

//Lodash
import { toLower, upperFirst } from 'lodash';

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'
import { useFirebaseSaveAllChanges } from '../../../hooks/useFirebaseSaveAllChanges'

// eslint-disable-next-line no-unused-vars
export const GardenDetailScreen = ({ debug, navigation, route }) => {
	const gid = route.params.gid;
	const gardenIndex = parseInt(route.params.index);

	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const thereAreNotSavedChanges = useSelector(state => state.changeReducer.thereAreNotSavedChanges);

	//Hooks
	const { loading: gardenLoading, result: garden, error: gardenError } = useFirebaseGetOne(debug, 'gardens', 'gid', gid);
	const [saveChanges] = useFirebaseSaveAllChanges(debug);

	//Navigation
	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const navigateBack = () => {
		navigation.goBack();
	};

	//State
	const [loadComponents, setLoadComponents] = useState(false);

	useEffect(() => {
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		//console.log(`🌀 GDET - Cargando   ${gid} | ${gardenLoading.toString()}`)
	}, [gardenLoading]);

	useEffect(() => {
		if (garden?.gid) {
			console.log(`🍀 GDET - Jardín     ${gid} |`, garden?.name)
			//console.log(`🍀 GDET - Jardín     ${gid} |`, garden)
			setLoadComponents(true);
			console.log(`🕳  GDET - Dispatch Loading STOP`)
			dispatch(setLoadingMessage(false))
		}
	}, [garden]);

	useEffect(() => {
		if (gardenError) {
			console.log(`🩸 GDET - Error   ${gid} | ${gardenError}`)
			dispatch(setErrorMessage(gardenError))
		}
	}, [gardenError]);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<TopNavigation title={'Detalles del Jardín'} alignment='center' accessoryLeft={BackAction} />
						<Divider />
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles.scrollView }}>
							<Layout style={{ ...gloStyles.layout }}>
								<SeparatorTopScreen hasTopNavigation={true} />
								<View style={{ ...gloStyles.view }}>
									{loadComponents ?
										(
											<>
												<View style={{ ...gloStyles.section.primary }}>
													<TitleScreen icon={'sun-outline'} exterStyles={{ wrapper: { marginBottom: 15 } }} primaryText={upperFirst(toLower(garden?.name)) || ''} secondaryText={''} />
													<ImgWithPicker entity={garden || {}} entityType={'garden'} />
													{{
														'client': (
															<>
																{Platform.OS === "web" && <BtnSecondary size={'medium'} disabled={false} icon={AddIcon} text={"Añadir detalle"} onPress={() => navigation.navigate("DetailScreen", { gid: garden?.gid, name: garden?.name })} />}

																{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}
															</>
														),
														'business': (
															<>
																{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}
															</>
														),
														'worker': (
															<>
																{Platform.OS === "web" && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}
															</>
														)
													}[user?.role]}
												</View>
												<View style={{ ...gloStyles.section.secondary }}>
													<SeparatorTopSection />
													{{
														'client': (
															<>

																{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}

																<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />

																{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}

																{Platform.OS !== "web" && <BtnSecondary size={'medium'} disabled={false} icon={AddIcon} text={"Añadir detalle"} onPress={() => navigation.navigate("DetailScreen", { gid: garden?.gid, name: garden?.name })} />}

																<DetailsList gid={gid || ''} gardenIndex={gardenIndex || 0} />
															</>
														),
														'business': (
															<>
																{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}

																<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />

																{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}
															</>
														),
														'worker': (
															<>
																{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}

																<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />

																{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} />}
															</>
														)
													}[user?.role]}
												</View></>
										)
										: null}
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
