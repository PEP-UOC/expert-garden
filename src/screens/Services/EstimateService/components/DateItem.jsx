/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

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
import { View, TouchableWithoutFeedback } from 'react-native'
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

	const selectDate = () => {
		handleBusinessSelectServiceDate(sid, cid, date.did)
	}



	return (
		<View key={values?.sdid} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Fecha ${dateIndex + 1}`}
				</Text>

				{/*BADGE SELECCIONADA*/}
				{
					isSelected ?
						(
							<View style={{ ...ownStyles.badgeAccepted }}>
								<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
									Seleccionada
								</Text>
							</View>
						)
						: isSelected === false ?
							(
								<TouchableWithoutFeedback onPress={() => selectDate(dateIndex)}
									accessible={true}
									accessibilityLabel="Seleccionar fecha"
									accessibilityHint="Seleccionar fecha">
									<View style={{ ...ownStyles.badgeAccept }}>
										<Text style={{ ...ownStyles.badgeText }}>
											Seleccionar
										</Text>
									</View>
								</TouchableWithoutFeedback>
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
	selectedIndex: PropTypes.number.isRequired,
	cid: PropTypes.string.isRequired,
	sid: PropTypes.string.isRequired,
};

DateItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
