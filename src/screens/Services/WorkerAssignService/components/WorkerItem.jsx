/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useState } from 'react'
import PropTypes from "prop-types";
//import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Components
import { View, TouchableWithoutFeedback } from 'react-native'
import { Text, } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Hooks
import { useFirebaseServiceUtils } from "../../../../hooks/useFirebaseServiceUtils"

// eslint-disable-next-line no-unused-vars
export const WorkerItem = ({ debug, worker, workerIndex, isSelected, sid }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(worker)


	const { handleBusinessSelectServiceWorker } = useFirebaseServiceUtils(debug)

	const selectWorker = () => {
		handleBusinessSelectServiceWorker(sid, values.uid)
	}


	return (
		<View key={values?.uid} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Empleado ${workerIndex + 1}`}
				</Text>

				{/*BADGE SELECCIONADA*/}
				{
					isSelected ?
						(
							<View style={{ ...ownStyles.badgeAccepted }}>
								<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
									Seleccionado
								</Text>
							</View>
						)
						: isSelected === false ?
							(
								<TouchableWithoutFeedback onPress={() => selectWorker(workerIndex)}
									accessible={true}
									accessibilityLabel="Seleccionar trabajador"
									accessibilityHint="Seleccionar trabajador">
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
							lineHeight: Device?.isPhone ? 25 : undefined,
						}
					}
				}
				primaryText={`${worker?.metadata?.fullname}`}
				secondaryText={''}
			/>

		</View>
	)
};

WorkerItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	worker: PropTypes.object.isRequired,
	workerIndex: PropTypes.number.isRequired,
	isSelected: PropTypes.bool.isRequired,
	sid: PropTypes.string.isRequired,
};

WorkerItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
