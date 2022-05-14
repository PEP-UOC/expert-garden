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

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { BtnSecondary } from '../../../components/Buttons/Secondary'
import { ImgWithPicker } from '../../../components/Images/WithPicker'
import { GardenDataForm } from './components/GardenData'
import { DetailsList } from './components/DetailsList'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { SaveIcon } from '../../../assets/icons/Save'

//Lodash
import { toLower, upperFirst } from 'lodash';

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'
import { useFirebaseSaveAllChanges } from '../../../hooks/useFirebaseSaveAllChanges'

// eslint-disable-next-line no-unused-vars
export const GardenAddScreen = ({ debug, navigation, route }) => {
	const [gid, setGid] = useState('new');
	//const gid = route.params.gid;
	const gardenIndex = parseInt(route.params.index);

	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const thereAreNotSavedChanges = useSelector(state => state.changeReducer.thereAreNotSavedChanges);

	//Hooks
	//const garden = {};
	const { loading: gardenLoading, result: garden, error: gardenError } = useFirebaseGetOne(debug, 'gardens', 'gid', gid);
	const [saveChanges] = useFirebaseSaveAllChanges(debug);

	//State
	const [loadComponents, setLoadComponents] = useState(false);

	useEffect(() => {
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		//console.log(`🌀 GADD - Cargando   ${gid} | ${gardenLoading.toString()}`)
	}, [gardenLoading]);

	useEffect(() => {
		if (garden?.gid) {
			setGid(garden?.gid)
			console.log(`🍀 GADD - Jardín     ${garden?.gid} |`, garden?.name)
			//console.log(`🍀 GADD - Jardín     ${garden?.gid} |`, garden)
			setLoadComponents(true);
			console.log(`🕳  GADD - Dispatch Loading STOP`)
			dispatch(setLoadingMessage(false))
		}
	}, [garden]);

	useEffect(() => {
		if (gardenError) {
			console.log(`🩸 GADD - Error   ${gid} | ${gardenError}`)
			dispatch(setErrorMessage(gardenError))
		}
	}, [gardenError]);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop title={'Añadir nuevo Jardín'} />
					<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
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
															{!Device.isPhone && <BtnSecondary size={'medium'} disabled={false} icon={AddIcon} text={"Añadir detalle"} onPress={() => navigation.navigate("DetailScreen", { gid: garden?.gid, name: garden?.name })} btnStyle={{ marginBottom: 30 }} />}

															{!Device.isPhone && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 30 }} />}

															<NavigationBackButton show={!Device.isPhone} btnStyle={{ marginBottom: 30 }} />
														</>
													),
													'business': (
														<>
															{!Device.isPhone && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 30 }} />}

															<NavigationBackButton show={!Device.isPhone} btnStyle={{ marginBottom: 30 }} />
														</>
													),
													'worker': (
														<>
															{!Device.isPhone && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 30 }} />}

															<NavigationBackButton show={!Device.isPhone} btnStyle={{ marginBottom: 30 }} />
														</>
													)
												}[user?.role]}
											</View>

											<View style={{ ...gloStyles.section.secondary }}>
												<SeparatorTopSection />
												{{
													'client': (
														<>
															<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />

															{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 15, marginTop: 15 }} />}

															{Device.isPhone && <BtnSecondary size={'medium'} disabled={false} icon={AddIcon} text={"Añadir detalle"} onPress={() => navigation.navigate("DetailScreen", { gid: garden?.gid, name: garden?.name })} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

															<DetailsList gid={gid || ''} gardenIndex={gardenIndex || 0} />

															<NavigationBackButton show={Device.isPhone} />
														</>
													),
													'business': (
														<>
															<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />

															{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

															<NavigationBackButton show={Device.isPhone} />
														</>
													),
													'worker': (
														<>

															<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />

															{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

															<NavigationBackButton show={Device.isPhone} />
														</>
													)
												}[user?.role]}
											</View>
										</>
									)
									: null}
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

GardenAddScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

GardenAddScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
