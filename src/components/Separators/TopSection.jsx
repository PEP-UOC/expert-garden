import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

//Components
import { View } from 'react-native';

// eslint-disable-next-line no-unused-vars
export const SeparatorTopSection = ({ debug }) => {

	return (
		<View style={{
			marginTop: Device?.isPhone ? 10 : 4,
			marginBottom: Device?.isPhone ? 10 : 3,
			width: '100%',
		}}></View>
	)
};

SeparatorTopSection.propTypes = {
	debug: PropTypes.bool.isRequired,
};

SeparatorTopSection.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
