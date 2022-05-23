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
import consola from '../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector } from 'react-redux'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'
import { Text, Modal, Spinner } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const ModalFullScreen = ({ debug }) => {

	//Loading
	const loadingMessage = useSelector(state => state.rootReducer.loadingMessage);
	consola('normal', `🫧 MOFU - loadingMessage → ${loadingMessage}`)

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<Modal
			visible={loadingMessage}
			backdropStyle={{ ...ownStyles.fullScreen.backdrop }}
		>
			<View style={{ ...ownStyles.fullScreen.view }}>
				<Text style={{ ...ownStyles.fullScreen.text, ...gloStyles.colorPrimary600 }}>{loadingMessage}</Text>
				<Spinner size='giant' />
			</View>
		</Modal >
	)
};

ModalFullScreen.propTypes = {
	debug: PropTypes.bool.isRequired
};

ModalFullScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
