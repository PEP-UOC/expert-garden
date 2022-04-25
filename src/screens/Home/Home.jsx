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
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../components/Separators/TopSection'
import { TitleScreen } from '../../components/Titles/Screen'
import { BtnWithLogo } from '../../components/Buttons/WithLogo'
import { EmailVerify } from './components/EmailVerify'
import { NotificationsList } from '../Notifications/components/List'
import { ServicesList } from '../Services/components/List'

//Icons
import { AddIcon } from '../../assets/icons/Add'

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

	useEffect(() => {
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
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<TopNavigation title={debug ? `${device} Inicio ${role}` : 'Inicio'} alignment='center' />
						<Divider />
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles.scrollView }}>
							<Layout style={{ ...gloStyles.layout }}>
								<SeparatorTopScreen />
								<View style={{ ...gloStyles.view }}>
									<View style={{ ...gloStyles.section.primary }}>
										<TitleScreen icon={''} primaryText={user?.additionalUserInfo?.isNewUser ? 'Bienvenido' : 'Bienvenido'} secondaryText={`${user?.metadata?.name} ${gender}` || ''} />
										<EmailVerify user={user || {}} />
										{
											{
												'client': (
													<BtnWithLogo icon={AddIcon} text={"SOLICITA UN SERVICIO"} onPress={navigateServiceRequest} />
												),
												'business': (
													<BtnWithLogo icon={AddIcon} text={"PRÓXIMOS SERVICIOS"} onPress={navigateServiceRequest} />
												),
												'worker': (
													<BtnWithLogo icon={AddIcon} text={"EMPEZAR A TRABAJAR"} onPress={navigateServiceRequest} />
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
														<NotificationsList type={'last'} />
														<ServicesList type={'requested'} />
														<ServicesList type={'inProgress'} />
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
				</TouchableWithoutFeedback>
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
