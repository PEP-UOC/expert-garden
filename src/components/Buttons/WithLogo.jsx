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

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'


// eslint-disable-next-line no-unused-vars
export const BtnWithLogo = ({ debug, icon, text, onPress }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper, marginBottom: 25 }}>
			<LeafIcon width={240} height={90} style={{ ...gloStyles.leaf, ...ownStyles?.logo }} />
			<Button style={{ ...gloStyles?.button, ...ownStyles?.btnWithLogo }} size='large' onPress={onPress} accessoryLeft={icon}>{text}</Button>
		</View>
	)
};

BtnWithLogo.propTypes = {
	debug: PropTypes.bool.isRequired,
	icon: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func,
};

BtnWithLogo.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
