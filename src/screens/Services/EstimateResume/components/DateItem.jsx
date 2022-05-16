import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Data
import { momentTypes } from '../../../../data/momentTypes'

//Hooks
import { useFirebaseServiceUtils } from "../../../../hooks/useFirebaseServiceUtils"

// eslint-disable-next-line no-unused-vars
export const DateItem = ({ debug, date, dateIndex, selectedIndex, cid, sid }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(date)

	const [isSelected, setIsSelected] = useState(dateIndex === selectedIndex)

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleBusinessSelectServiceDate } = useFirebaseServiceUtils(debug)


	useEffect(() => {
		setIsSelected(dateIndex === selectedIndex)
	}, [dateIndex, selectedIndex]);

	if (!isSelected) {
		return null
	}

	return (
		<View key={values?.sdid} style={{ ...ownStyles.itemWrapper }}>

			{/*TITULO SECCIÓN SERVICIO*/}
			<TitleSection icon={''}
				exterStyles={
					{
						wrapper: {
							marginBottom: Device?.isPhone ? 5 : 15,
							marginTop: Device?.isPhone ? 10 : 15
						},
						primaryText: {
							fontSize: Device?.isPhone ? 22 : 22,
							lineHeight: Device?.isPhone ? 25 : undefined
						}
					}
				}
				primaryText={date?.date}
				secondaryText={''}
			/>

			<Text style={{ ...ownStyles.textQuestion }}>
				{momentTypes.find(momentType => momentType.name === date?.schedule)?.value || ''}
			</Text>

			{date?.extra ? (
				<Text style={{ ...ownStyles.textResponse }}>
					{date?.extra || ''}
				</Text>
			) : null}


		</View>
	)
};

DateItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	date: PropTypes.object.isRequired,
	dateIndex: PropTypes.number.isRequired,
	selectedIndex: PropTypes.number.isRequired,
	cid: PropTypes.string.isRequired,
	sid: PropTypes.string.isRequired,
};

DateItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
