import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Components
import { View } from 'react-native'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const EstimatedTotal = ({ debug, companyEstimationTotalPrice }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper, marginBottom: 30, flexDirection: 'row', justifyContent: 'flex-end' }}>
			<View style={{ ...ownStyles.itemWrapperTotal }}>
				<View style={{ alignSelf: Device?.isPhone ? 'flex-end' : 'center', marginRight: Device?.isPhone ? 14 : 0 }}>
					<TitleSection icon={''} primaryText={`Total: ${companyEstimationTotalPrice} €`} secondaryText={''} exterStyles={{ wrapperInt: { width: undefined }, primaryText: { marginLeft: 0, marginBottom: 0, color: '#fff', alignSelf: 'center' } }} />
				</View>
			</View >
		</View>
	)
};

EstimatedTotal.propTypes = {
	debug: PropTypes.bool.isRequired,
	companyEstimationTotalPrice: PropTypes.number.isRequired
};

EstimatedTotal.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
