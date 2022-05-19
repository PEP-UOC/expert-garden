import React, { useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

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
								<TouchableWithoutFeedback onPress={() => selectWorker(workerIndex)}>
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
