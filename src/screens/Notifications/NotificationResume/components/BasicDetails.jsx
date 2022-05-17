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
