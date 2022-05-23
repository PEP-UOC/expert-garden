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

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'
//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { View } from 'react-native'
import { Text, Modal, Card } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const ModalError = ({ debug }) => {
	const dispatch = useDispatch()

	//Loading
	const errorMessage = useSelector(state => state.rootReducer.errorMessage);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<Modal
			visible={errorMessage}
			backdropStyle={{ ...ownStyles.error.backdrop }}
			onBackdropPress={() => dispatch(setErrorMessage(false))}>
			<Card disabled={true}>
				<View style={{ ...ownStyles.error.view }}>
					<Text style={{ ...ownStyles.error.text, marginTop: 10 }}>{errorMessage}</Text>
					<View style={{ alignItems: 'center', marginBottom: 10 }}>
						<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
					</View>
				</View>
			</Card>
		</Modal>
	)
};

ModalError.propTypes = {
	debug: PropTypes.bool.isRequired
};

ModalError.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
