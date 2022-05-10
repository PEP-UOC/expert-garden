import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { DetailItem } from './DetailItem'

// eslint-disable-next-line no-unused-vars
export const DetailsList = ({ debug, details }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles.servicesWrapper }}>
			{details && details?.map((detail, index) => {
				return (
					<DetailItem detail={detail} detailIndex={index} key={detail.sdid} />
				)
			})}
		</View>
	)
};

DetailsList.propTypes = {
	debug: PropTypes.bool.isRequired,
	details: PropTypes.array.isRequired,
};

DetailsList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
