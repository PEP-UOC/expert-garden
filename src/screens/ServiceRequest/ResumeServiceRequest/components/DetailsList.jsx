import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Store
import { useSelector } from 'react-redux'

//Components
import { View } from 'react-native'
import { DetailItem } from './DetailItem'

// eslint-disable-next-line no-unused-vars
export const DetailsList = ({ debug, setSdidToRemove, setShowDeleteConfirm }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	//Store
	const details = useSelector(state => state.serviceReducer.serviceTemporal.details);

	return (
		<View style={{ ...ownStyles.itemsWrapper }}>
			{details && details?.map((detail, index) => {
				return (
					<DetailItem detail={detail} detailIndex={index} key={detail.sdid} setSdidToRemove={setSdidToRemove} setShowDeleteConfirm={setShowDeleteConfirm} />
				)
			})}
		</View>
	)
};

DetailsList.propTypes = {
	debug: PropTypes.bool.isRequired,
	setSdidToRemove: PropTypes.func.isRequired,
	setShowDeleteConfirm: PropTypes.func.isRequired,
};

DetailsList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
