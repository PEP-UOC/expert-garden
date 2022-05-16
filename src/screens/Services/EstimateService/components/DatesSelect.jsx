import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { DateItem } from './DateItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const DatesSelect = ({ debug, dates, companyHasSelectedDate, cid, sid }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	const dateIndex = dates.findIndex(date => date.did === companyHasSelectedDate);
	const selectedIndex = dateIndex === -1 ? 0 : dateIndex;

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'calendar-outline'} primaryText={'Disponibilidad'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>

				{dates && dates?.map((date, index) => {
					return (
						<DateItem date={date} dateIndex={index} key={date.did} selectedIndex={selectedIndex} cid={cid} sid={sid} />
					)
				})}
			</View>
		</View>
	)
};

DatesSelect.propTypes = {
	debug: PropTypes.bool.isRequired,
	dates: PropTypes.array.isRequired,
	companyHasSelectedDate: PropTypes.string.isRequired,
	cid: PropTypes.string.isRequired,
	sid: PropTypes.string.isRequired,
};

DatesSelect.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
