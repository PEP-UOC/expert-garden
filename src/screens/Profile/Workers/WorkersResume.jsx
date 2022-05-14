import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './components/styles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop />
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<View style={{ ...gloStyles.view }}>

								<View style={{ ...gloStyles.section.primary }}>

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={`${user?.metadata?.fullname}`} secondaryText={''} />

									{!Device.isPhone && (
										<View style={{ paddingLeft: 45 }}>
											<NavigationBackButton show={Device.isPhone} />
										</View>
									)}

								</View>

								<View style={{ ...gloStyles.section.secondary }}>
									<View>
										<Text style={{ ...ownStyles.textQuestion }}>
											{`Email`}
										</Text>
										<Text style={{ ...ownStyles.textResponse }}>
											{`${user?.metadata?.email}`}
										</Text>
										<Text style={{ ...ownStyles.textQuestion }}>
											{`Teléfono`}
										</Text>
										<Text style={{ ...ownStyles.textResponse }}>
											{`${user?.metadata?.phoneNumber}`}
										</Text>
										<Text style={{ ...ownStyles.textQuestion }}>
											{`Fecha de nacimiento`}
										</Text>
										<Text style={{ ...ownStyles.textResponse }}>
											{`${user?.metadata?.birthday || 'No indicado'}`}
										</Text>
										{user?.bankDetails &&
											(
												<>
													<Text style={{ ...ownStyles.textQuestion }}>
														{`IBAN `}
													</Text>
													<Text style={{ ...ownStyles.textResponse }}>
														{`${user?.bankDetails?.IBAN || 'No indicado'}`}
													</Text>
												</>
											)}
									</View>

									<NavigationBackButton show={Device.isPhone} />
								</View>
							</View>
						</Layout>
					</ScrollView>
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
