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

// eslint-disable-next-line no-unused-vars
export const CompanyItem = ({ debug, company, companyIndex }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(company)

	return (
		<View key={values?.sdid} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Empresa ${companyIndex + 1}`}
				</Text>

				{/*BADGE ACEPTADO*/}
				{company?.budget ?
					company?.selected ?
						(
							<View style={{ ...ownStyles.badgeAccepted }}>
								<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
									Aceptado
								</Text>
							</View>
						)
						: company?.selected === false ?
							(
								<View style={{ ...ownStyles.badgeRejected }}>
									<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
										Rechazado
									</Text>
								</View>
							) : null
					: null
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
				primaryText={`${company?.name}`}
				secondaryText={''}
			/>

			<Text style={{ ...ownStyles.textQuestion }}>
				{`${company?.budget ? `Disponible` : 'No disponible todavía'}`}
			</Text>

		</View>
	)
};

CompanyItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	company: PropTypes.object.isRequired,
	companyIndex: PropTypes.number.isRequired,
};

CompanyItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
