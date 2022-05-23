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

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'
import { Text } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const MomentItem = ({ debug, title, moment }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View key={title} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop, marginBottom: 0 }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ ${title}`}
				</Text>

				<Text style={{ ...ownStyles.textResponse, marginBottom: 0, fontSize: Device?.isPhone ? 16 : 16 }}>
					{moment}
				</Text>

			</View>
		</View>
	)
};

MomentItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	moment: PropTypes.string.isRequired,
};

MomentItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
