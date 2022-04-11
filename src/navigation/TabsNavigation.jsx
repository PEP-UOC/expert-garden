import React from 'react';
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

//Screens
import { HomeScreen } from '../screens/Home/Home';
import { ServiceRequestNavigation } from './ScreensNavigation/ServiceRequestNavigation';

//Icons
import { HomeIcon } from '../assets/icons/Home'
import { PersonIcon } from '../assets/icons/Person'
import { AddIcon } from '../assets/icons/Add'
import { TruckIcon } from '../assets/icons/Truck'
import { BellIcon } from '../assets/icons/Bell'


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

BottomTabBar.propTypes = {
    debug: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
};

BottomTabBar.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};

const Tabs = createBottomTabNavigator()
export const TabsNavigation = () => {
    return (
        <Tabs.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} tabBar={props => {
            return <BottomTabBar {...props} />
        }}>
            <Tabs.Screen name='Home' component={HomeScreen} />
            <Tabs.Screen name='ServiceRequest' component={ServiceRequestNavigation} />
            <Tabs.Screen name='ServiceRequest2' component={ServiceRequestNavigation} />
            <Tabs.Screen name='ServiceRequest3' component={ServiceRequestNavigation} />
            <Tabs.Screen name='ServiceRequest4' component={ServiceRequestNavigation} />
        </Tabs.Navigator>
    )
};