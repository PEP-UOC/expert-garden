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
import styles from './styles'

//Components
import { View } from 'react-native'
import { DateItem } from './DateItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const DatesSelect = ({ debug, dates, companyHasSelectedDate, cid, sid }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	const dateIndex = dates.findIndex(date => date.did === companyHasSelectedDate);
	const selectedIndex = dateIndex === -1 ? 0 : dateIndex;

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'calendar-outline'} primaryText={'Disponibilidad'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>

				{dates && dates?.map((date, index) => {
					return (
						<DateItem date={date} dateIndex={index} key={date.did} selectedIndex={selectedIndex} cid={cid} sid={sid} />
					)
				})}
			</View>
		</View>
	)
};

DatesSelect.propTypes = {
	debug: PropTypes.bool.isRequired,
	dates: PropTypes.array.isRequired,
	companyHasSelectedDate: PropTypes.string.isRequired,
	cid: PropTypes.string.isRequired,
	sid: PropTypes.string.isRequired,
};

DatesSelect.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
