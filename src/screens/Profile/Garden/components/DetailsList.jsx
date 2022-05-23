/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../../store/root/rootAction';

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Button, ListItem } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Icons
import { ChevronRightIcon } from '../../../../assets/icons/ChevronRight'

//Hooks
import useFirebaseGetOne from '../../../../hooks/useFirebaseGetOne'

//Data
import { gardenDetailTypes, gardenDetailSubTypes } from '../../../../data/gardenDetailTypes'

//Lodash
import { forIn, toLower, upperFirst } from 'lodash';

// eslint-disable-next-line no-unused-vars
export const DetailsList = ({ debug, gid, gardenIndex }) => {
	const dispatch = useDispatch()

	const navigation = useNavigation();

	//Hooks
	const { loading: gardenLoading, result: garden, error: gardenError } = useFirebaseGetOne(debug, 'gardens', 'gid', gid);

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [details, setDetails] = useState([]);

	//Navigation
	const navigateServiceRequest = (gdid, detail) => {
		navigation.navigate('DetailScreen', { gid: garden?.gid, name: garden?.name, gdid: gdid, detail: detail });
	};

	//List
	const RenderItem = ({ item }) => {
		return (
			<ListItem
				onPress={() => navigateServiceRequest(item.gdid, item)}
				//title={`${item.mainType} - ${item.subType}`}
				title={`${gardenDetailTypes.find((type) => type.identifier === item.mainType).value} - ${gardenDetailSubTypes.find((type) => type.identifier === item.subType).value}`}
				description={renderDescription(item)}
				accessoryRight={renderItemAccessory(item.gdid, item)}
			/>
		)
	};

	RenderItem.propTypes = {
		item: PropTypes.object.isRequired,
	};

	const renderDescription = (item) => {
		let desc = '';
		// eslint-disable-next-line react/prop-types
		forIn(item?.inputs, (value, key) => {
			desc += `${upperFirst(toLower(key))}: ${value} | `
		})
		return desc.substring(0, desc.length - 3)
	};

	const renderItemAccessory = (gdid, detail) => (
		<Button onPress={() => navigateServiceRequest(gdid, detail)}
			accessoryRight={ChevronRightIcon} size='giant' appearance='ghost' />
	);

	useEffect(() => {
		//consola('normal',`🌀 GDAT - Cargando   ${gid} | ${gardenLoading}`)
	}, [gardenLoading]);

	useEffect(() => {
		if (garden?.gid) {
			//consola('normal',`🍀 GDAT - Jardín     ${gid} | ${garden?.name}`)
			setDetails(garden?.details);
		}
	}, [garden]);

	useEffect(() => {
		if (gardenError) {
			consola('error', `🩸 GDAT - Error   ${gid} | ${gardenError}`)
			dispatch(setErrorMessage(gardenError))
		}
	}, [gardenError]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'layers-outline'} primaryText={'Detalles'} secondaryText={''} />

			{details?.length
				? details?.map((detail) => (
					<View key={detail.gdid} style={{ ...ownStyles?.item }}>
						<RenderItem item={detail} />
					</View>
				))
				: <View key={`empty-details`}>
					<ListItem
						title={'Todavía no has añadido ningún detalle al jardín'}
					/>
				</View>
			}
		</View>
	)
};

DetailsList.propTypes = {
	debug: PropTypes.bool.isRequired,
	gid: PropTypes.string.isRequired,
	gardenIndex: PropTypes.number.isRequired,
};

DetailsList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
