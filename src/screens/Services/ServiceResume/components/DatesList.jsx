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
export const DatesList = ({ debug, dates, dateSelected, isConfirmed }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'calendar-outline'} primaryText={'Disponibilidad'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>


				{dates && dates?.map((date, index) => {
					const isSelected = (date.did === dateSelected && isConfirmed) ? true :
						(dates?.length === 1 && isConfirmed) ? true :
							(!isConfirmed) ? null :
								false;

					return (
						<DateItem date={date} dateIndex={index} key={date.did} isSelected={isSelected} />
					)
				})}
			</View>
		</View>
	)
};

DatesList.propTypes = {
	debug: PropTypes.bool.isRequired,
	dates: PropTypes.array.isRequired,
	dateSelected: PropTypes.string.isRequired,
	isConfirmed: PropTypes.bool.isRequired,
};

DatesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
