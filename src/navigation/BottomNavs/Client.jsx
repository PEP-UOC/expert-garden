/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React from 'react';
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

//Icons
import { HomeIcon } from '../../assets/icons/Home'
import { PersonIcon } from '../../assets/icons/Person'
import { AddIcon } from '../../assets/icons/Add'
import { TruckIcon } from '../../assets/icons/Truck'
import { BellIcon } from '../../assets/icons/Bell'

// eslint-disable-next-line no-unused-vars
export const ClientBottomTabBar = ({ debug, navigation, state }) => {

	return (
		<BottomNavigation
			selectedIndex={state.index}
			onSelect={index => navigation.navigate(state.routeNames[index])}>
			<BottomNavigationTab icon={HomeIcon} />
			<BottomNavigationTab icon={PersonIcon} />
			<BottomNavigationTab icon={AddIcon} />
			<BottomNavigationTab icon={TruckIcon} />
			<BottomNavigationTab icon={BellIcon} />
		</BottomNavigation>
	)
};

ClientBottomTabBar.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	state: PropTypes.object.isRequired
};

ClientBottomTabBar.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
