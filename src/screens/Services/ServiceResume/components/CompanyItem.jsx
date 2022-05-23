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
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text, Button } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Icons
import { BookOpenIcon } from '../../../../assets/icons/BookOpen'

// eslint-disable-next-line no-unused-vars
export const CompanyItem = ({ debug, company, companyIndex, sid }) => {

	//Navigation
	const navigation = useNavigation();

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(company)

	//Navigation
	const navigateToEstimateResume = () => {
		navigation.navigate("Services", {
			screen: 'EstimateResumeScreen',
			params: { sid, cid: company?.cid },
		});
	};


	return (
		<View key={values?.sdid} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Empresa ${companyIndex + 1}`}
				</Text>

				{/*BADGE ACEPTADO*/}
				{company?.isSelected ?
					(
						<View style={{ ...ownStyles.badgeAccepted }}>
							<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
								Aceptado
							</Text>
						</View>
					)
					: company?.isRefused ?
						(
							<View style={{ ...ownStyles.badgeRejected }}>
								<Text style={{ ...ownStyles.badgeText }} appearance='alternative'>
									Rechazado
								</Text>
							</View>
						) : company?.isEstimated ? (
							<View style={{ ...ownStyles.badgeRevision }}>
								<Text style={{ ...ownStyles.badgeText }} >
									Por revisar
								</Text>
							</View>
						) : (
							<View style={{ ...ownStyles.badgeWaiting }}>
								<Text style={{ ...ownStyles.badgeText }} >
									Esperando
								</Text>
							</View>
						)
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
				primaryText={`${company?.name}`}
				secondaryText={''}
			/>

			{
				company?.isSelected ?
					(
						<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
								Aceptado
							</Text>
							<Button
								style={{ ...ownStyles.iconButton }}
								appearance={'ghost'}
								accessoryRight={<BookOpenIcon fill={ownStyles.iconColor.fill} />}
								onPress={() => {
									navigateToEstimateResume()
								}}
							>

							</Button>
						</View>
					)
					: company?.isRefused ?
						(
							<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
								<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
									Rechazado
								</Text>
								{company?.isEstimated && (
									<Button
										style={{ ...ownStyles.iconButton }}
										appearance={'ghost'}
										accessoryRight={<BookOpenIcon fill={ownStyles.iconColor.fill} />}
										onPress={() => {
											navigateToEstimateResume()
										}}
									>

									</Button>
								)}
							</View>
						) : company?.isEstimated
							? (
								<View style={{ ...ownStyles.badgeWaiting, width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
									<Text style={{ ...ownStyles.bigBadgeText }}>
										Presupuestado
									</Text>
									<Button
										style={{ ...ownStyles.iconButton }}
										appearance={'ghost'}
										accessoryRight={<BookOpenIcon fill={ownStyles.iconColor.fill} />}
										onPress={() => {
											navigateToEstimateResume()
										}}
									>

									</Button>
								</View>
							)
							: (
								<View style={{ ...ownStyles.badgeWaiting, width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
									<Text style={{ ...ownStyles.bigBadgeText }}>
										Esperando presupuesto
									</Text>
								</View>
							)}



		</View>
	)
};

CompanyItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	company: PropTypes.object.isRequired,
	companyIndex: PropTypes.number.isRequired,
	sid: PropTypes.string.isRequired,
};

CompanyItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
