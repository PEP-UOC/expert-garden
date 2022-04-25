import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../store/root/rootAction';

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

//Lodash
import { toLower, upperFirst } from 'lodash';

//Hooks
import { useFirebaseSaveAllChanges } from '../../../hooks/useFirebaseSaveAllChanges'

// eslint-disable-next-line no-unused-vars
export const AddGardenScreen = ({ debug, navigation, route }) => {
	const gardenIndex = parseInt(route.params.index);

	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const thereAreNotSavedChanges = useSelector(state => state.changeReducer.thereAreNotSavedChanges);

	//Hooks
	const [saveChanges] = useFirebaseSaveAllChanges(debug);

	//Navigation
	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const navigateBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		console.log('🧹 GADD - Limpiando GardenTemporal')
		dispatch(setErrorMessage(false))
	}, []);


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
										{/*<TitleScreen icon={'person-outline'} primaryText={'Detalles de ' + upperFirst(toLower(garden?.type)) || ''} secondaryText={''} />*/}
										<TitleScreen icon={'person-outline'} primaryText={'Detalles de '} secondaryText={''} />
										{/*<ImgWithPicker entity={garden || {}} entityType={'garden'} />*/}
										<ImgWithPicker entity={{}} entityType={'garden'} />
										{{
											'client': (
												<>
													{Platform.OS === "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
												</>
											),
											'business': (
												<>
													{Platform.OS === "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
												</>
											),
											'worker': (
												<>
													{Platform.OS === "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
												</>
											)
										}[user?.role]}
									</View>
									<View style={{ ...gloStyles.section.secondary }}>
										<SeparatorTopSection />
										{{
											'client': (
												<>
													{/*<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />*/}
													<GardenDataForm gid={''} gardenIndex={gardenIndex || 0} />
													{Platform.OS !== "web" && thereAreNotSavedChanges && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
												</>
											),
											'business': (
												<>
													{/*<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />*/}
													<GardenDataForm gid={''} gardenIndex={gardenIndex || 0} />
													{Platform.OS !== "web" && thereAreNotSavedChanges && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
												</>
											),
											'worker': (
												<>
													{/*<GardenDataForm gid={gid || ''} gardenIndex={gardenIndex || 0} />*/}
													<GardenDataForm gid={''} gardenIndex={gardenIndex || 0} />
													{Platform.OS !== "web" && thereAreNotSavedChanges && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={AddIcon} text={"Guardar cambios"} onPress={saveChanges} />}
												</>
											)
										}[user?.role]}
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

AddGardenScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

AddGardenScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
