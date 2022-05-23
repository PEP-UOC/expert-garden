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

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Components
import { View } from 'react-native'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const EstimatedTotal = ({ debug, companyEstimationTotalPrice }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper, marginBottom: 30, flexDirection: 'row', justifyContent: 'flex-end' }}>
			<View style={{ ...ownStyles.itemWrapperTotal }}>
				<View style={{ alignSelf: Device?.isPhone ? 'flex-end' : 'center', marginRight: Device?.isPhone ? 14 : 0 }}>
					<TitleSection icon={''} primaryText={`Total: ${companyEstimationTotalPrice} €`} secondaryText={''} exterStyles={{ wrapperInt: { width: undefined }, primaryText: { marginLeft: 0, marginBottom: 0, alignSelf: 'center' } }} />
				</View>
			</View >
		</View>
	)
};

EstimatedTotal.propTypes = {
	debug: PropTypes.bool.isRequired,
	companyEstimationTotalPrice: PropTypes.number.isRequired
};

EstimatedTotal.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
