import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View } from 'react-native';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

// eslint-disable-next-line no-unused-vars
export const SeparatorTopScreen = ({ debug, hasTopNavigation }) => {

	return (
		<View style={{
			marginTop: Device?.isPhone ? hasTopNavigation ? 0 : 10 : 15,
			marginBottom: Device?.isPhone ? hasTopNavigation ? 0 : 10 : 15,
			width: '100%',
		}}></View>
	)
};

SeparatorTopScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	hasTopNavigation: PropTypes.bool.isRequired,
};

SeparatorTopScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	hasTopNavigation: false,
};
