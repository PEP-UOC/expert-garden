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
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../../store/root/rootAction';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { ServicesList } from '../MainServices/components/List'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

// eslint-disable-next-line no-unused-vars
export const ServiceListScreen = ({ debug, navigation, route, showLong }) => {
	const dispatch = useDispatch()

	const type = route.params.type;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//State
	const [title, setTitle] = useState('');
	const [longTitle, setLongTitle] = useState('');
	const [icon, setIcon] = useState('');

	useLayoutEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				case 'requested':
					setTitle('Solicitados')
					setLongTitle('Servicios solicitados')
					setIcon('inbox-outline')
					break;
				case 'inProgress':
					setTitle('Próximos')
					setLongTitle('Próximos servicios')
					setIcon('play-circle-outline')
					break;
				case 'inProgressPunctual':
					setTitle('Próximos puntuales')
					setLongTitle('Próximos servicios puntuales')
					setIcon('checkmark-circle-outline')
					break;
				case 'inProgressRecurrent':
					setTitle('Próximos recurrentes')
					setLongTitle('Próximos servicios recurrentes')
					setIcon('clock-outline')
					break;
				case 'past':
				case 'pastBusiness':
				case 'pastAsigned':
					setTitle('Finalizados')
					setLongTitle('Servicios finalizados')
					setIcon('shopping-bag-outline')
					break;
				case 'cancelated':
				case 'cancelatedBusiness':
					setTitle('Cancelados')
					setLongTitle('Servicios cancelados')
					setIcon('slash-outline')
					break;
				case 'received':
					setTitle('Recibidos')
					setLongTitle('Servicios recibidos')
					setIcon('inbox-outline')
					break;
				case 'notEstimated':
					setTitle('Por presupuestar')
					setLongTitle('Servicios esperando un presupuesto')
					setIcon('inbox-outline')
					break;
				case 'estimated':
					setTitle('Presupuestados')
					setLongTitle('Servicios presupuestados')
					setIcon('crop-outline')
					break;
				case 'refused':
					setTitle('Presupuestados rechazados')
					setLongTitle('Servicios presupuestados rechazados')
					setIcon('close-circle-outline')
					break;
				case 'next':
				case 'nextAsigned':
					setTitle('Próximos')
					setLongTitle('Próximos servicios')
					setIcon('rewind-right-outline')
					break;
				case 'nextPunctual':
					setTitle('Próximos puntuales')
					setLongTitle('Próximos servicios puntuales')
					setIcon('checkmark-circle-outline')
					break;
				case 'nextRecurrent':
					setTitle('Próximos recurrentes')
					setLongTitle('Próximos servicios recurrentes')
					setIcon('clock-outline')
					break;
				default:
					break;
			}
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	useEffect(() => {
		consola('normal', `🕳  SERL - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop title="Servicios" />
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
									<ServicesList type={type} limit={10000} showTitle={false} cid={user?.metadata?.cid} />
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

ServiceListScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
	showLong: PropTypes.bool,
};

ServiceListScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	showLong: false,
};
