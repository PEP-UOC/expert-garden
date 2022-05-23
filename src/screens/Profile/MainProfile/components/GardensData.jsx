/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'
import { List, ListItem } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'
import { GardenItem } from './Garden'

//Hooks
import useFirebaseGetAllWhere from '../../../../hooks/useFirebaseGetAllWhere'

// eslint-disable-next-line no-unused-vars
export const GardensDataForm = ({ debug }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//Hooks
	const extraElement = { name: 'addGarden' };
	const { loading: gardensLoading, result: gardens, error: gardensError } = useFirebaseGetAllWhere(debug, 'gardens', 'uid', user?.uid, extraElement);

	useEffect(() => {
		//consola('normal',`🌀 GSDA - Cargando          | ${gardensLoading.toString()}`)
	}, [gardensLoading]);

	useEffect(() => {
		if (gardens) {
			//consola('normal',`🍀 GSDA - Nuevos jardines   | ${gardens?.length || 0}`)
		}
	}, [gardens]);

	useEffect(() => {
		if (gardensError) {
			consola('error', `🩸 GSDA - Error          | ${gardensError}`)
			dispatch(setErrorMessage(gardensError))
		}
	}, [gardensError]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'sun-outline'} primaryText={'Mis jardines'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{gardens?.length && !gardensLoading
					? <List
						data={gardens}
						horizontal={true}
						keyExtractor={(item) => item?.gid || item?.name}
						renderItem={(garden) => <GardenItem garden={garden} />}
						style={{ width: '100%' }}
					/>
					: <ListItem
						title={'Todavía no has solicitado ningún servicio'}
					/>
				}
			</View>
		</View>
	)
};

GardensDataForm.propTypes = {
	debug: PropTypes.bool.isRequired,
};

GardensDataForm.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
