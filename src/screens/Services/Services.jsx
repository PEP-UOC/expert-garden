import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../components/Separators/TopSection'
import { TitleScreen } from '../../components/Titles/Screen'
import { BtnWithLogo } from '../../components/Buttons/WithLogo'
import { ServicesList } from './components/List'

//Icons
import { AddIcon } from '../../assets/icons/Add'

// eslint-disable-next-line no-unused-vars
export const ServicesScreen = ({ debug, navigation }) => {
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
												<BtnWithLogo icon={AddIcon} text={"Solicita un servicio"} onPress={navigateServiceRequest} />
											),
											'business': (
												<BtnWithLogo icon={AddIcon} text={"Próximos servicios"} onPress={navigateServiceRequest} />
											),
											'worker': (
												<BtnWithLogo icon={AddIcon} text={"Empezar a trabajar"} onPress={navigateServiceRequest} />
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
													<ServicesList type={'requested'} />
													<ServicesList type={'inProgressPunctual'} />
													<ServicesList type={'inProgressRecurrent'} />
													<ServicesList type={'past'} />
												</>
											),
											'business': (
												<ServicesList type={'requested'} />
											),
											'worker': (
												<ServicesList type={'requested'} />
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

ServicesScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

ServicesScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
