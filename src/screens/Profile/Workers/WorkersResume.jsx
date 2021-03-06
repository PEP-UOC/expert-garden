/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React from 'react'
import PropTypes from "prop-types";
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Linking
import { Linking } from 'react-native'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './components/styles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Image, TouchableWithoutFeedback } from 'react-native'
import { Layout, Text, Icon } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

// eslint-disable-next-line no-unused-vars
export const WorkersResumeScreen = ({ debug, navigation, route }) => {

	const uid = route.params.uid;

	//Hooks
	// eslint-disable-next-line no-unused-vars
	const { loading: userLoading, result: user, error: userError } = useFirebaseGetOne(debug, 'users', 'uid', uid);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Handler
	const openTel = (tel) => {
		Linking.openURL(`tel:${tel}`)
	}
	const openEmail = (email) => {
		Linking.openURL(`mailto:${email}`)
	}

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

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={`${user?.metadata?.fullname}`} secondaryText={''} />

									{user?.metadata?.photoFirebaseURL && (
										<Image
											source={{ uri: user?.metadata?.photoFirebaseURL }}
											style={{ ...ownStyles?.image, marginBottom: 40 }}
										/>
									)}

									{!Device.isPhone && (
										<View style={{ paddingLeft: 45 }}>
											<NavigationBackButton show={!Device.isPhone} />
										</View>
									)}

								</View>

								<View style={{ ...gloStyles.section.secondary }}>
									<View>
										<Text style={{ ...ownStyles.textQuestion }}>
											{`Email`}
										</Text>
										<View style={{ ...ownStyles.responseRow }}>
											<Text style={{ ...ownStyles.textResponse, marginBottom: 0 }}>
												{`${user?.metadata?.email}`}
											</Text>
											<TouchableWithoutFeedback onPress={() => openEmail(user?.metadata?.email)}
												accessible={true}
												accessibilityLabel="Enviar email"
												accessibilityHint="Enviar email">
												<View style={{
													marginLeft: 10,
													justifyContent: 'center',
													cursor: 'pointer'
												}}>
													<Icon
														width={ownStyles.iconsContact.width}
														height={ownStyles.iconsContact.height}
														fill={ownStyles.iconsContact.fill}
														name='email-outline'
													/>
												</View>
											</TouchableWithoutFeedback>
											{!user?.verified && (
												<View style={{ ...ownStyles.textBadge, ...ownStyles.bgError, marginLeft: Device?.isPhone ? 10 : 'auto', marginTop: Device?.isPhone ? 10 : 0 }}>
													<Text status='control'>
														{`Sin verficar`}
													</Text>
												</View>
											)}
										</View>

										<Text style={{ ...ownStyles.textQuestion }}>
											{`Teléfono`}
										</Text>
										<View style={{ ...ownStyles.responseRow }}>
											<Text style={{ ...ownStyles.textResponse, marginBottom: 0 }}>
												{`${user?.metadata?.phoneNumber}`}
											</Text>
											<TouchableWithoutFeedback onPress={() => openTel(user?.metadata?.phoneNumber)}
												accessible={true}
												accessibilityLabel="Llamar por teléfono"
												accessibilityHint="Llamar por teléfono">
												<View style={{
													marginLeft: 10,
													justifyContent: 'center',
													cursor: 'pointer'
												}}>
													<Icon
														width={ownStyles.iconsContact.width}
														height={ownStyles.iconsContact.height}
														fill={ownStyles.iconsContact.fill}
														name='phone-outline'
													/>
												</View>
											</TouchableWithoutFeedback>
										</View>

										<Text style={{ ...ownStyles.textQuestion }}>
											{`Fecha de nacimiento`}
										</Text>
										<Text style={{ ...ownStyles.textResponse }}>
											{`${user?.metadata?.birthday || 'No indicada'}`}
										</Text>

										<Text style={{ ...ownStyles.textQuestion }}>
											{`IBAN `}
										</Text>
										<Text style={{ ...ownStyles.textResponse }}>
											{`${user?.bankDetails?.IBAN || 'No indicado'}`}
										</Text>
									</View>

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

WorkersResumeScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

WorkersResumeScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
