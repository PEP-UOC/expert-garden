import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import { LoginScreen } from '../screens/Auth/Login';
import { SignUpScreen } from '../screens/Auth/SignUp';
import { RememberPass } from '../screens/Auth/RememberPass';


const Auth = createNativeStackNavigator()
export const AuthNavigation = () => (
    <Auth.Navigator
        screenOptions={{ headerShown: false }}
    >
        <Auth.Screen name='Login' component={LoginScreen} />
        <Auth.Screen name='SignUp' component={SignUpScreen} />
        <Auth.Screen
            name="RememberPass"
            component={RememberPass}
            options={{ animationEnabled: true, presentation: "modal" }}
        />
    </Auth.Navigator>
)