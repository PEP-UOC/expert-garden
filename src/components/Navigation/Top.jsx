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
