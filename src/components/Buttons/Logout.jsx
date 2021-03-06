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
import AsyncStorage from '@react-native-async-storage/async-storage';
import consola from '../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Components
import { View } from 'react-native'
import { Button } from '@ui-kitten/components'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Store
import { useDispatch } from 'react-redux'
import { setLoadingMessage, setLoggedIn } from '../../store/root/rootAction';
import { removeUser } from '../../store/user/userAction';

//Icons
import { LogOutIcon } from '../../assets/icons/LogOut'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const BtnLogout = ({ debug }) => {
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Logout

	const doClearData = async () => {
		consola('normal', `🕳  BTLG - Dispatch Loading START`)
		dispatch(setLoadingMessage(debug ? '🔧 Adiós!' : 'Adiós!'))
		try {
			await AsyncStorage.clear()
				.then(() => {
					auth().signOut()
						.then(() => {
							dispatch({
								type: 'SIGNOUT_REQUEST',
								payload: undefined,
							})
							consola('normal', `🔐 BTLG - Logged Out!`)
							dispatch(setLoggedIn(false))
							consola('normal', `🕳  BTLG - Dispatch Loading STOP`)
							dispatch(setLoadingMessage(false))
							dispatch(removeUser())
						})
						.catch((error) => {
							consola('error', `🩸 ERROR - ${error.message}`);
							dispatch(setLoggedIn(false))
							consola('normal', `🕳  BTLG - Dispatch Loading STOP`)
							dispatch(setLoadingMessage(false))
						});
				})
				.catch((error) => {
					consola('error', `🩸 ERROR - ${error.message}`);
					dispatch(setLoggedIn(false))
					consola('normal', `🕳  BTLG - Dispatch Loading STOP`)
					dispatch(setLoadingMessage(false))
				});
		} catch (error) {
			consola('error', `🩸 ERROR - ${error.message}`);
			dispatch(setLoggedIn(false))
			consola('normal', `🕳  BTLG - Dispatch Loading STOP`)
			dispatch(setLoadingMessage(false))
		}
	}

	return (
		<View style={{ ...ownStyles?.wrapper, marginBottom: 40 }}>
			<Button style={{
				...gloStyles?.button,
				...ownStyles?.btnPrimary
			}} size='medium' accessoryLeft={LogOutIcon} status='danger' appearance='outline' onPress={doClearData}>Cerrar sesión</Button>
		</View>
	)
};

BtnLogout.propTypes = {
	debug: PropTypes.bool.isRequired
};

BtnLogout.defaultProps = {
	debug: Constants.manifest.extra.debug || false
};
