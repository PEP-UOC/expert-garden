import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Device Detect
import Device from '../../libs/react-native-device-detection'

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
import { EmailVerify } from './components/EmailVerify'
import { NotificationsList } from '../Notifications/MainNotifications/components/List'
import { ServicesList } from '../Services/MainServices/components/List'

//Icons
import { TruckIcon } from '../../assets/icons/Truck'

// eslint-disable-next-line no-unused-vars
export const HomeScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//Navigation
	const navigateServiceRequest = () => {
		navigation.navigate('ServiceRequest');
	};
	const navigateNextServices = () => {
		navigation.navigate('Services', {
			screen: 'ServiceListScreen',
			params: { type: 'next' },
		});
	};

	useEffect(() => {
		console.log(`🕳  HOME - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		console.log('👩‍🌾 HOME - Usuario', user?.metadata?.fullname, user?.metadata?.email);
		//console.log('🙋‍♂️ HOME - user', user)
	}, [user]);

	const device = Device.isPhone ? '📱' : '💻';
	const role = user?.role === 'client' ? '🧔🏻‍♂️' : '💼';
	const gender = user?.metadata?.gender === 'male' ? '🧑‍🌾' : user?.metadata?.gender === 'female' ? '👩‍🌾' : '🌳';

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
									<TitleScreen icon={''} exterStyles={{ wrapper: { marginBottom: 30 }, primaryText: { fontSize: 36 }, secondaryText: { fontSize: 36 } }} primaryText={user?.additionalUserInfo?.isNewUser ? 'Bienvenido' : 'Bienvenido'} secondaryText={`${user?.metadata?.name} ${gender}` + ` ${device} ${role}` || ''} secondaryTextMain={true} />
									<EmailVerify user={user || {}} />
									{
										{
											'client': (
												<BtnWithLogo icon={TruckIcon} text={"Solicita un nuevo servicio"} onPress={navigateServiceRequest} />
											),
											'business': (
												<BtnWithLogo icon={TruckIcon} text={"Próximos servicios"} onPress={navigateNextServices} />
											),
											'worker': (
												<BtnWithLogo icon={TruckIcon} text={"Empezar a trabajar"} onPress={navigateServiceRequest} />
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
													<NotificationsList type={'new'} limit={3} showLong={true} externalIcon={'bell-outline'} />
													<ServicesList type={'requested'} limit={3} showLong={true} />
													<ServicesList type={'inProgress'} limit={3} showLong={true} />
												</>
											),
											'business': (
												<>
													<NotificationsList type={'new'} limit={3} showLong={true} externalIcon={'bell-outline'} />
													<ServicesList type={'notEstimated'} limit={3} showLong={true} />
													<ServicesList type={'next'} limit={3} showLong={true} />
												</>
											),
											'worker': (
												<>
													<NotificationsList type={'new'} limit={3} showLong={true} externalIcon={'bell-outline'} />
													<ServicesList type={'next'} limit={3} showLong={true} />
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

HomeScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

HomeScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
