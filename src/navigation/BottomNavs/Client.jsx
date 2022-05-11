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
