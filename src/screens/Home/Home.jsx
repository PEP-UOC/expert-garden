/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';
import { StatusBar } from 'expo-status-bar';

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
		consola('normal', `🕳  HOME - Dispatch Loading STOP`);
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		consola('normal', `👩‍🌾 HOME - Usuario ${user?.metadata?.fullname, user?.metadata?.email}`);
		//consola('normal','🙋‍♂️ HOME - user')
		//consola('normal',user)
	}, [user]);

	const device = Device.isPhone ? '📱' : '💻';
	const role = user?.role === 'client' ? '🧔🏻‍♂️' : '💼';
	const gender = user?.metadata?.gender === 'male' ? '🧑‍🌾' : user?.metadata?.gender === 'female' ? '👩‍🌾' : '🌳';

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
									<TitleScreen icon={''} exterStyles={{ wrapper: { marginBottom: 30 }, primaryText: { fontSize: 36 }, secondaryText: { fontSize: 36 } }} primaryText={user?.additionalUserInfo?.isNewUser ? 'Bienvenido' : 'Bienvenido'} secondaryText={debug ? `${user?.metadata?.name} ${gender}` + ` ${device} ${role}` : `${user?.metadata?.name}`} secondaryTextMain={true} />
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
													<ServicesList type={'nextAsigned'} limit={3} showLong={true} />
												</>
											)
										}[user?.role]
									}
								</View>

							</View>
						</Layout >
					</ScrollView>
					<StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#31a060' translucent={false} />
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
