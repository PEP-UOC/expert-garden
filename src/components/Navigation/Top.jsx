import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Device Detect
//import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

//Icons
import { BackIcon } from '../../assets/icons/Back'

// eslint-disable-next-line no-unused-vars
export const NavigationTop = ({ debug, title, routeToBack }) => {

	//Navigation
	const navigation = useNavigation();

	const navigateBack = () => {
		if (!routeToBack) {
			navigation.goBack();
		} else {
			navigation.navigate(routeToBack);
		}
	};

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	return (
		<>
			<TopNavigation title={title} alignment='center' accessoryLeft={BackAction} style={{ marginTop: 0 }} />
			<Divider />
		</>
	)
};

NavigationTop.propTypes = {
	debug: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	routeToBack: PropTypes.string,
};

NavigationTop.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	title: '',
	routeToBack: undefined,
};
