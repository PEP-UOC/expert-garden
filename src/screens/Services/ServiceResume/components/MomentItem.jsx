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
