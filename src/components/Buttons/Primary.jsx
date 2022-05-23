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
import { Button } from '@ui-kitten/components'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'


// eslint-disable-next-line no-unused-vars
export const BtnPrimary = ({ debug, icon, text, onPress, disabled, size, btnStyle, status }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<Button
				style={
					{
						...gloStyles?.button,
						...ownStyles?.btnPrimary,
						...btnStyle
					}
				}
				size={size}
				onPress={onPress}
				accessoryLeft={icon}
				disabled={disabled}
				status={status}
			>
				{text}
			</Button>
		</View>
	)
};

BtnPrimary.propTypes = {
	debug: PropTypes.bool.isRequired,
	icon: PropTypes.func,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func,
	disabled: PropTypes.bool.isRequired,
	size: PropTypes.string.isRequired,
	btnStyle: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
};

BtnPrimary.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	size: 'large',
	icon: undefined,
	disabled: false,
	btnStyle: {},
	status: 'primary',
};
