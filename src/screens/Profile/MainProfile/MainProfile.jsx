import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../store/root/rootAction';
import { removeChangesToSave } from '../../../store/change/changeAction';

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { ImgWithPicker } from '../../../components/Images/WithPicker'
import { PersonalDataForm } from './components/PersonalData'
import { CompanyDataForm } from './components/CompanyData'
import { GardensDataForm } from './components/GardensData'
import { BankDataForm } from './components/BankData'
import { SessionActionsBtns } from './components/SessionActions'
import { WorkersSection } from '../Workers/WorkersSection'


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
		consola('normal', '🧹 MAPR - Limpiando changesToSave')
		dispatch(removeChangesToSave())
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen />
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={'person-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 10 : 30 } }} primaryText={user?.metadata?.name || ''} secondaryText={''} />
									<ImgWithPicker entity={user || {}} entityType={'user'} />
									{
										{
											'client': (
												<>
													{!Device.isPhone && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 30 }} />}
												</>
											),
											'business': (
												<>
													{!Device.isPhone && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 30 }} />}
												</>
											),
											'worker': (
												<>
													{!Device.isPhone && <BtnPrimary size={'medium'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 30 }} />}
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

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

													<GardensDataForm />

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 25 }} />}

													<BankDataForm />

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

													<SessionActionsBtns />
												</>
											),
											'business': (
												<>
													<CompanyDataForm />

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

													<BankDataForm />

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

													{user?.metadata?.hasWorkers && <WorkersSection />}

													<SessionActionsBtns />
												</>
											),
											'worker': (
												<>
													<PersonalDataForm />

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

													<BankDataForm />

													{Device.isPhone && <BtnPrimary size={'small'} disabled={!thereAreNotSavedChanges} icon={SaveIcon} text={"Guardar todos los cambios"} onPress={saveChanges} btnStyle={{ marginBottom: 40, marginTop: 15 }} />}

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
