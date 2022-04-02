import React from 'react';
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

//Screens
import { HomeScreen } from '../../screens/Home/Home';
import { ServiceRequestScreen } from '../../screens/ServiceRequest/ServiceRequest';

//Icons
import { HomeIcon } from '../icons/Home'
import { PersonIcon } from '../icons/Person'
import { AddIcon } from '../icons/Add'
import { TruckIcon } from '../icons/Truck'
import { BellIcon } from '../icons/Bell'

const { Navigator, Screen } = createBottomTabNavigator();

// eslint-disable-next-line no-unused-vars
const BottomTabBar = ({ debug, navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={PersonIcon} />
        <BottomNavigationTab icon={AddIcon} />
        <BottomNavigationTab icon={TruckIcon} />
        <BottomNavigationTab icon={BellIcon} />
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} tabBar={props => {
        return <BottomTabBar {...props} />
    }}>
        <Screen name='Home' component={HomeScreen} />
        <Screen name='ServiceRequest' component={ServiceRequestScreen} />
        {/*<Screen name='ServiceRequest' component={ServiceRequestScreen} />*/}
        {/*<Screen name='ServiceRequest' component={ServiceRequestScreen} />*/}
        {/*<Screen name='ServiceRequest' component={ServiceRequestScreen} />*/}
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);

BottomTabBar.propTypes = {
    debug: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
};

BottomTabBar.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};