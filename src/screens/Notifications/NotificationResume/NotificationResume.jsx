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
//import consola from '../../../libs/myLogger';
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BasicDetails } from './components/BasicDetails'
import { Links } from './components/Links'
import { ContentDetails } from './components/ContentDetails'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//Moment
import moment from "moment";

// eslint-disable-next-line no-unused-vars
export const NotificationResumeScreen = ({ debug, navigation, route }) => {

	const nid = route.params.nid;

	//Firebase
	const firestore = firebase.firestore;

	//Hooks
	// eslint-disable-next-line no-unused-vars
	const { loading: notificationLoading, result: notification, error: notificationError } = useFirebaseGetOne(debug, 'notifications', 'nid', nid);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	useEffect(() => {
		if (notification?.readDate === null) {
			const now = moment();
			const readDateTime = now.format();
			const readDate = now.format("DD/MM/YYYY");
			const readTime = now.format("HH:mm");
			firestore().collection("notifications").doc(nid).update({
				readDateTime,
				readDate,
				readTime
			});
		}
	}, [notification]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop />
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen hasTopNavigation={true} />
							<View style={{ ...gloStyles.view }}>

								<View style={{ ...gloStyles.section.primary }}>

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Notificación'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{/*SECCIÓN LINKS*/}
										{!Device.isPhone && <Links
											sid={notification?.data?.sid}
										/>}

										<NavigationBackButton show={!Device.isPhone} btnStyle={{ marginTop: 30 }} />
									</View>

								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{/*SECCIÓN CONTENIDO*/}
									<ContentDetails title={notification?.title || ''} body={notification?.body || ''} />

									{/*SECCIÓN MOMENTOS*/}
									<BasicDetails
										sendDateTime={notification?.sendDateTime}
										readDateTime={notification?.readDateTime}
									/>

									{/*SECCIÓN LINKS*/}
									{Device.isPhone && <Links
										sid={notification?.data?.sid}
									/>}

									<NavigationBackButton show={Device.isPhone} />
								</View>

							</View>
						</Layout>
					</ScrollView>
					<StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#31a060' translucent={false} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

NotificationResumeScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

NotificationResumeScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
