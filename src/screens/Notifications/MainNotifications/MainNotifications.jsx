import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../../libs/myLogger';

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
import { TitleScreen } from '../../../components/Titles/Screen'
import { NotificationsList } from './components/List'

// eslint-disable-next-line no-unused-vars
export const MainNotificationsScreen = ({ debug, navigation }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	useEffect(() => {
		consola('normal', `🕳  NOTI - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

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
									<TitleScreen icon={'bell-outline'} exterStyles={{ wrapper: { marginBottom: 15 } }} primaryText={'Notificaciones'} secondaryText={''} />
								</View>
								<View style={{ ...gloStyles.section.secondary }}>
									{
										{
											'client': (
												<>
													<NotificationsList type={'new'} limit={3} />
													<NotificationsList type={'read'} limit={3} />
													<NotificationsList type={'last'} limit={3} />
												</>
											),
											'business': (
												<>
													<NotificationsList type={'new'} limit={3} />
													<NotificationsList type={'read'} limit={3} />
													<NotificationsList type={'last'} limit={3} />
												</>
											),
											'worker': (
												<>
													<NotificationsList type={'new'} limit={3} />
													<NotificationsList type={'read'} limit={3} />
													<NotificationsList type={'last'} limit={3} />
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

MainNotificationsScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

MainNotificationsScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
