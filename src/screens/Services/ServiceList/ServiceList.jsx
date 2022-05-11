import React, { useEffect, useLayoutEffect, useState } from 'react'
import PropTypes from "prop-types";

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
import { ServicesList } from '../MainServices/components/List'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

// eslint-disable-next-line no-unused-vars
export const ServiceListScreen = ({ debug, navigation, route }) => {
	const dispatch = useDispatch()

	const type = route.params.type;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//State
	const [title, setTitle] = useState('');
	const [icon, setIcon] = useState('');

	useLayoutEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				case 'requested':
					setTitle('Servicios solicitados')
					setIcon('inbox-outline')
					break;
				case 'inProgress':
					setTitle('Servicios en curso')
					setIcon('play-circle-outline')
					break;
				case 'inProgressPunctual':
					setTitle('Servicios en curso puntuales')
					setIcon('checkmark-circle-outline')
					break;
				case 'inProgressRecurrent':
					setTitle('Servicios en curso recurrentes')
					setIcon('clock-outline')
					break;
				case 'past':
					setTitle('Servicios anteriores')
					setIcon('shopping-bag-outline')
					break;
				case 'cancelated':
					setTitle('Servicios cancelados')
					setIcon('slash-outline')
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
		console.log(`🕳  SERL - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop />
					<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={icon} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 } }} primaryText={title} secondaryText={''} />
									<View style={{ paddingLeft: 45 }}>
										<NavigationBackButton show={Platform.OS === "web"} />
									</View>

								</View>
								<View style={{ ...gloStyles.section.secondary }}>
									<ServicesList type={type} limit={10000} showTitle={false} />
									<NavigationBackButton show={Platform.OS !== "web"} btnStyle={{ marginTop: 0 }} />
								</View>

							</View>
						</Layout >
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

ServiceListScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

ServiceListScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
