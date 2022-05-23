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
//import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
//import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { View } from 'react-native'
import { Text, Modal, Card } from '@ui-kitten/components';
import { BtnPrimary } from '../../components/Buttons/Primary'
import { BtnSecondary } from '../../components/Buttons/Secondary'

// eslint-disable-next-line no-unused-vars
export const ModalOptions = ({ debug, mainText, show, setShow, option1text, option1onPress, option2text, option2onPress, backdropPress, option1status }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<Modal
			visible={show}
			backdropStyle={{ ...ownStyles.error.backdrop }}
			onBackdropPress={backdropPress || (() => setShow(false))}>
			<Card disabled={true}>
				<View style={{ ...ownStyles.error.view }}>
					<Text style={{
						...ownStyles.fullScreen.text,
						marginBottom: 15,
					}}>{mainText}</Text>
					<BtnPrimary size={'small'} text={option1text} onPress={option1onPress} btnStyle={{ marginBottom: 20 }} status={option1status} />
					<BtnSecondary size={'small'} text={option2text} onPress={option2onPress} btnStyle={{ marginBottom: 0 }} />

					{/*<View style={{ alignItems: 'center' }}>
						<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
					</View>*/}
				</View>
			</Card>
		</Modal >
	)
};

ModalOptions.propTypes = {
	debug: PropTypes.bool.isRequired,
	mainText: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	option1text: PropTypes.string.isRequired,
	option1onPress: PropTypes.func.isRequired,
	option2text: PropTypes.string.isRequired,
	option2onPress: PropTypes.func.isRequired,
	backdropPress: PropTypes.func,
	option1status: PropTypes.string
};

ModalOptions.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	option1status: 'primary',
};
