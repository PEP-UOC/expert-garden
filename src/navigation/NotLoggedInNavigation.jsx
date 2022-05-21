import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import { LoginScreen } from '../screens/Auth/Login';
import { SignUpScreen } from '../screens/Auth/SignUp';
import { RememberPass } from '../screens/Auth/RememberPass';

import { ValidatingScreen } from '../screens/Validating/Validating';
import { TermsAndConditionsScreen } from '../screens/TermsAndConditions/TermsAndConditions';

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
		<NotLoggedIn.Screen name='TermsAndConditionsScreen' component={TermsAndConditionsScreen} />
		<NotLoggedIn.Screen name='ValidatingScreen' component={ValidatingScreen} />
	</NotLoggedIn.Navigator>
)
