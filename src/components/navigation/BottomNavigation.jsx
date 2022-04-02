import React from 'react';

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

const BottomTabBar = ({ navigation, state }) => (
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