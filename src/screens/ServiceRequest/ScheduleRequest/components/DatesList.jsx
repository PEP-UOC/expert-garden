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

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useSelector } from 'react-redux'

//Components
import { View } from 'react-native'
import { TitleSection } from '../../../../components/Titles/Section'
import { DateItem } from './DateItem'

// eslint-disable-next-line no-unused-vars
export const DatesList = ({ debug }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const dates = useSelector(state => state.serviceReducer.serviceTemporal.dates);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'loader-outline'} primaryText={'Fechas por orden de preferencia'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{dates && dates?.map((date, index) => {
					return (
						<DateItem date={date} dateIndex={index} key={date.did} />
					)
				})}
			</View>
		</View>
	)
};

DatesList.propTypes = {
	debug: PropTypes.bool.isRequired,
};

DatesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
