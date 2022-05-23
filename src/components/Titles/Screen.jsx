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

//Components
import { View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';


// eslint-disable-next-line no-unused-vars
export const TitleScreen = ({ debug, exterStyles, icon, primaryText, secondaryText, secondaryTextMain }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={
			{
				...exterStyles?.wrapper,
				flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'flex-start'
			}
		}>

			<View style={
				{
					flexDirection: 'row', alignItems: 'center'
				}
			}>
				{!Device.isPhone && icon !== '' && <Icon width={40} height={40} name={icon} fill='#094c3f' />}
				<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.screenText, ...exterStyles?.primaryText }}>{primaryText}</Text>
			</View>

			<Text
				category={secondaryTextMain ? 'h1' : 's1'}
				style={secondaryTextMain
					? { ...gloStyles?.h1, ...ownStyles?.screenText, ...exterStyles?.secondaryText }
					: { ...ownStyles?.screenText, ...exterStyles?.secondaryText, marginLeft: Device.isPhone ? 0 : 61 }}
			>
				{secondaryText}
			</Text>
		</View>
	)
};

TitleScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	exterStyles: PropTypes.object.isRequired,
	icon: PropTypes.string,
	primaryText: PropTypes.string.isRequired,
	secondaryText: PropTypes.string.isRequired,
	secondaryTextMain: PropTypes.bool.isRequired,
};

TitleScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	exterStyles: { primaryText: {}, secondaryText: {} },
	secondaryTextMain: false,
};
