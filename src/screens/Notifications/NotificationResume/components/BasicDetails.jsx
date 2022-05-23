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
import { MomentItem } from './MomentItem'

//Moment
import moment from "moment";

// eslint-disable-next-line no-unused-vars
export const BasicDetails = ({ debug, sendDateTime, readDateTime }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);


	let sendTime;
	if (moment().format('DD/MM/YYYY') === moment(sendDateTime).format('DD/MM/YYYY')) {
		sendTime = `Hoy, ${moment(sendDateTime).format("HH:mm")}`;
	} else {
		sendTime = moment(sendDateTime).format('DD/MM/YYYY')
	}


	let readTime;
	if (moment().format('DD/MM/YYYY') === moment(readDateTime).format("DD/MM/YYYY")) {
		readTime = `Hoy, ${moment(readDateTime).format("HH:mm")}`;
	} else {
		readTime = moment(readDateTime).format('DD/MM/YYYY')
	}

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<View style={{ ...ownStyles.itemsWrapper }}>
				{sendDateTime ? (
					<MomentItem title={'Recibida:'} moment={sendTime} />
				) : null}

				{readDateTime ? (
					<MomentItem title={'Leída:'} moment={readTime} />
				) : null}
			</View>
		</View>
	)
};

BasicDetails.propTypes = {
	debug: PropTypes.bool.isRequired,
	sendDateTime: PropTypes.string,
	readDateTime: PropTypes.string,
};

BasicDetails.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	sendDateTime: '',
	readDateTime: '',
};
