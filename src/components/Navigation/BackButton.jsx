import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { BtnSecondary } from '../../components/Buttons/Secondary'

//Device Detect
import Device from '../../libs/react-native-device-detection';

// eslint-disable-next-line no-unused-vars
export const NavigationBackButton = ({ debug, show, btnStyle, routeToBack }) => {

	//Navigation
	const navigation = useNavigation();

	const navigateBack = () => {
		if (!routeToBack) {
			navigation.goBack();
		} else {
			navigation.navigate(routeToBack);
		}
	};

	if (!show) {
		return null
	}

	return (
		<BtnSecondary size={'medium'} text={"Volver"} onPress={navigateBack} btnStyle={{ backgroundColor: '#fff', marginTop: Device?.isPhone ? 30 : 0, ...btnStyle }} />
	)
};

NavigationBackButton.propTypes = {
	debug: PropTypes.bool.isRequired,
	show: PropTypes.bool.isRequired,
	btnStyle: PropTypes.object.isRequired,
	routeToBack: PropTypes.string,
};

NavigationBackButton.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	show: false,
	btnStyle: {},
	routeToBack: undefined,
};
