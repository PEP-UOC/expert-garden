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
import { DetailItem } from './DetailItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const DetailsList = ({ debug, details }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'layers-outline'} primaryText={'Detalles'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>

				{details && details?.map((detail, index) => {
					return (
						<DetailItem detail={detail} detailIndex={index} key={detail.sdid} />
					)
				})}
			</View>
		</View>
	)
};

DetailsList.propTypes = {
	debug: PropTypes.bool.isRequired,
	details: PropTypes.array.isRequired,
};

DetailsList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
