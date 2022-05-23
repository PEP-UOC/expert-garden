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
