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
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import { LoginScreen } from '../screens/Auth/Login';
import { SignUpScreen } from '../screens/Auth/SignUp';
import { RememberPass } from '../screens/Auth/RememberPass';

import { ValidatingScreen } from '../screens/Validating/Validating';

const NotLoggedIn = createNativeStackNavigator()
export const NotLoggedInNavigation = () => (
	<NotLoggedIn.Navigator
		screenOptions={{ headerShown: false }}
	>
		<NotLoggedIn.Screen name='Login' component={LoginScreen} />
		<NotLoggedIn.Screen name='SignUp' component={SignUpScreen} />
		<NotLoggedIn.Screen
			name="RememberPass"
			component={RememberPass}
			options={{ animationEnabled: true, presentation: "modal" }}
		/>
		<NotLoggedIn.Screen name='ValidatingScreen' component={ValidatingScreen} />
	</NotLoggedIn.Navigator>
)
