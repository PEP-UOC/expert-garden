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
import { removeChangesToSave } from '../../../store/change/changeAction';

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { ImgWithPicker } from '../../../components/Images/WithPicker'
import { PersonalDataForm } from './components/PersonalData'
import { GardensDataForm } from './components/GardensData'
import { BankDataForm } from './components/BankData'
import { SessionActionsBtns } from './components/SessionActions'

//Icons
import { SaveIcon } from '../../../assets/icons/Save'

//Hooks
import { useFirebaseSaveAllChanges } from '../../../hooks/useFirebaseSaveAllChanges'

// eslint-disable-next-line no-unused-vars
export const MainProfileScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const thereAreNotSavedChanges = useSelector(state => state.changeReducer.thereAreNotSavedChanges);

	//Hooks
	const [saveChanges] = useFirebaseSaveAllChanges(debug);

	useEffect(() => {
		console.log('🧹 MAPR - Limpiando changesToSave')
		dispatch(removeChangesToSave())
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
										<ImgWithPicker entity={user || {}} entityType={'user'} />
										{
											{
												'client': (
													<>
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
														{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} />}

														<GardensDataForm />

														{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} />}

														<BankDataForm />

														{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} />}

														<SessionActionsBtns />
													</>
												),
												'business': (
													<>
														{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} />}

														<PersonalDataForm />
														<BankDataForm />
														<SessionActionsBtns />
													</>
												),
												'worker': (
													<>
														{Platform.OS !== "web" && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} />}

														<PersonalDataForm />
														<BankDataForm />
														<SessionActionsBtns />
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
