/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useLayoutEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../libs/myLogger';
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../../store/root/rootAction';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { NotificationsList } from '../MainNotifications/components/List'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

// eslint-disable-next-line no-unused-vars
export const NotificationListScreen = ({ debug, navigation, route, showLong }) => {
	const dispatch = useDispatch()

	const type = route.params.type;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//State
	const [title, setTitle] = useState('');
	const [longTitle, setLongTitle] = useState('');
	const [icon, setIcon] = useState('');

	useLayoutEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				case 'last':
					setTitle('Todas')
					setLongTitle('Todas las notificaciones')
					setIcon('bell-outline')
					break;
				case 'new':
					setTitle('Nuevas')
					setLongTitle('Nuevas notificaciones')
					setIcon('radio-button-on-outline')
					break;
				case 'read':
					setTitle('Leídas')
					setLongTitle('Notificaciones leídas')
					setIcon('radio-button-off-outline')
					break;
				default:
					setTitle(undefined)
					setIcon('')
					break;
			}
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	useEffect(() => {
		consola('normal', `🕳  NOLI - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop title={'Notificaciones'} />
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen hasTopNavigation={true} />
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={icon} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 } }} primaryText={showLong ? longTitle : title} secondaryText={''} />
									<View style={{ paddingLeft: 45 }}>
										<NavigationBackButton show={!Device.isPhone} />
									</View>

								</View>
								<View style={{ ...gloStyles.section.secondary }}>
									<NotificationsList type={type} limit={10000} showTitle={false} />
									<NavigationBackButton show={Device.isPhone} btnStyle={{ marginTop: 0 }} />
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

NotificationListScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
	showLong: PropTypes.bool,
};

NotificationListScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	showLong: false,
};
