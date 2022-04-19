import React, { useEffect, useState } from 'react';

//Store
import { useDispatch, useSelector } from 'react-redux'
import { setValidatingMessage } from '../store/root/rootAction';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabsNavigation } from './TabsNavigation';
import { AuthNavigation } from './AuthNavigation';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { ValidatingScreen } from '../screens/ValidatingScreen/ValidatingScreen';

//Linking
import * as Linking from 'expo-linking';
function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window?.location?.search || '');
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const Root = createNativeStackNavigator()
const RootScreen = () => {
	const dispatch = useDispatch()

	//Store
	const isLoggedIn = useSelector(state => state.rootReducer.isLoggedIn);

	//State
	const [isLoading, setIsLoading] = useState(true)
	const [isValidating, setIsValidating] = useState(false)
	const [urlReceived, setUrlReceived] = useState(false)
	const [mode, setMode] = useState(undefined)
	const [actionCode, setActionCode] = useState(undefined)

	async function getInitialURL() {
		try {
			const url = await Linking.getInitialURL();
			console.log('👨‍🦯 Initial URL', url)
			setUrlReceived(url);
			return;
		} catch (e) {
			// We might want to provide this error information to an error reporting service
			console.warn(e);
		}
	}

	useEffect(() => {
		getInitialURL();
		setTimeout(() => {
			setIsLoading(false)
		}, 1500)
	}, [])

	useEffect(() => {
		if (!isValidating) {
			// Get the action to complete.
			var mode = getParameterByName('mode');
			// Get the one-time code from the query parameter.
			var actionCode = getParameterByName('oobCode');
			// (Optional) Get the continue URL from the query parameter if available.
			//var continueUrl = getParameterByName('continueUrl');
			// (Optional) Get the language code if available.
			//var lang = getParameterByName('lang') || 'es';

			//console.warn('mode', mode)
			//console.warn('actionCode', actionCode)
			//console.warn('continueUrl', continueUrl)
			//console.warn('lang', lang)

			if (mode !== null) {
				setMode(mode)
				setActionCode(actionCode)
				setIsValidating(true)
				switch (mode) {
					case 'verifyEmail':
						dispatch(setValidatingMessage('Validando email'))
						break;
					case 'resetPassword':
						dispatch(setValidatingMessage('Recuperando contraseña'))
						break;
				}
			}
		}
	}, [urlReceived])

	const LoadingSplashScreen = () => {
		return (
			<SplashScreen isSplash />
		)
	}

	const ValidatingScreenRender = () => {
		return (
			<ValidatingScreen mode={mode} actionCode={actionCode} />
		)
	}

	return (
		<Root.Navigator
			screenOptions={{ headerShown: false }}
		>
			{isLoading ? (
				<Root.Screen name="LoadingSplashScreen" component={LoadingSplashScreen} />
			) : isValidating ? (
				<Root.Screen name="ValidatingScreenRender" component={ValidatingScreenRender} />
			) : isLoggedIn ? (
				<Root.Screen name="TabsNavigation" component={TabsNavigation} />
			) : (
				<Root.Screen name="AuthNavigation" component={AuthNavigation} />
			)}
		</Root.Navigator>
	)
}

export const RootNavigation = () => (
	<NavigationContainer>
		<RootScreen />
	</NavigationContainer>
);
