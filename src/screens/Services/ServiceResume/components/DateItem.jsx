import React, { useState } from 'react'
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

// eslint-disable-next-line no-unused-vars
export const DateItem = ({ debug, date, dateIndex }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(date)

	return (
		<View key={values?.sdid} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Fecha ${dateIndex + 1}`}
				</Text>

				{/*BADGE SELECCIONADA*/}
				{
					date?.selected ?
						(
							<View style={{ ...ownStyles.badgeAccepted }}>
								<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
									Seleccionada
								</Text>
							</View>
						)
						: date?.selected === false ?
							(
								<View style={{ ...ownStyles.badgeRejected }}>
									<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
										Rechazada
									</Text>
								</View>
							) : null
				}
			</View>

			{/*TITULO SECCIÓN SERVICIO*/}
			<TitleSection icon={''}
				exterStyles={
					{
						wrapper: {
							marginBottom: Device?.isPhone ? 15 : 15
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
};

DateItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
