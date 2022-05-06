import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useSelector } from 'react-redux'

//Components
import { View } from 'react-native'
import { TitleSection } from '../../../../components/Titles/Section'
import { DateItem } from './DateItem'

// eslint-disable-next-line no-unused-vars
export const DatesList = ({ debug }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const dates = useSelector(state => state.serviceReducer.serviceTemporal.dates);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'loader-outline'} primaryText={'Fechas por orden de preferencia'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{dates && dates?.map((date, index) => {
					return (
						<DateItem date={date} dateIndex={index} key={date.did} />
					)
				})}
			</View>
		</View>
	)
};

DatesList.propTypes = {
	debug: PropTypes.bool.isRequired,
};

DatesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
