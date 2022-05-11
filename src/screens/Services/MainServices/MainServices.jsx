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

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnWithLogo } from '../../../components/Buttons/WithLogo'
import { ServicesList } from './components/List'

//Icons
import { TruckIcon } from '../../../assets/icons/Truck'

// eslint-disable-next-line no-unused-vars
export const MainServicesScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//Navigation
	const navigateServiceRequest = () => {
		navigation.navigate('ServiceRequest');
	};

	useEffect(() => {
		console.log(`🕳  SERV - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen />
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={'car-outline'} exterStyles={{ wrapper: { marginBottom: 15 } }} primaryText={'Servicios'} secondaryText={''} />
									{
										{
											'client': (
												<BtnWithLogo icon={TruckIcon} text={"Solicita un nuevo servicio"} onPress={navigateServiceRequest} />
											),
											'business': (null),
											'worker': (null)
										}[user?.role]
									}
								</View>
								<View style={{ ...gloStyles.section.secondary }}>
									<SeparatorTopSection />
									{
										{
											'client': (
												<>
													<ServicesList type={'requested'} limit={3} />
													<ServicesList type={'inProgressPunctual'} limit={3} />
													<ServicesList type={'inProgressRecurrent'} limit={3} />
													<ServicesList type={'past'} limit={3} />
													<ServicesList type={'cancelated'} limit={3} />
												</>
											),
											'business': (
												<>
													<ServicesList type={'received'} limit={3} />
													<ServicesList type={'nextPunctual'} limit={3} />
													<ServicesList type={'nextRecurrent'} limit={3} />
													<ServicesList type={'pastBusiness'} limit={3} />
													<ServicesList type={'cancelatedBusiness'} limit={3} />
												</>
											),
											'worker': (
												<>
													<ServicesList type={'next'} limit={3} />
													<ServicesList type={'past'} limit={3} />
												</>
											)
										}[user?.role]
									}
								</View>

							</View>
						</Layout >
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

MainServicesScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

MainServicesScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
