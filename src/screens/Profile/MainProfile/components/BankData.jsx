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
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { updateChangesToSave } from '../../../../store/change/changeAction';

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Input } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const BankDataForm = ({ debug }) => {
	const dispatch = useDispatch()

	//const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);
	const changesToSave = useSelector(state => state.changeReducer.changesToSave);

	//State
	const [values, setValues] = useState({
		cardNumber: user?.bankDetails?.cardNumber || "",
		cardExpiration: user?.bankDetails?.cardExpiration || "",
		cardHolder: user?.bankDetails?.cardHolder || "",
		IBAN: user?.bankDetails?.IBAN || "",
		IBANHolder: user?.bankDetails?.IBANHolder || "",
	})

	useEffect(() => {
		setValues({
			cardNumber: changesToSave?.bankDetails?.cardNumber || user?.bankDetails?.cardNumber || "",
			cardExpiration: changesToSave?.bankDetails?.cardExpiration || user?.bankDetails?.cardExpiration || "",
			cardHolder: changesToSave?.bankDetails?.cardHolder || user?.bankDetails?.cardHolder || "",
			IBAN: changesToSave?.bankDetails?.IBAN || user?.bankDetails?.IBAN || "",
			IBANHolder: changesToSave?.bankDetails?.IBANHolder || user?.bankDetails?.IBANHolder || "",
		})
	}, [changesToSave]);

	//Handle
	function handleChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
		const newBankDetails = { ...values }
		newBankDetails[keyName] = value;
		//consola('normal','💶 BKDA - newBankDetails')
		//consola('normal',newBankDetails)

		dispatch(updateChangesToSave({ bankDetails: newBankDetails }, false))
	}

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'credit-card-outline'} primaryText={'Datos bancarios'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{
					{
						'client': (
							<>
								<View style={{ ...gloStyles?.inputs?.row }}>
									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='Número de la tarjeta'
										placeholder='XXXX XXXX XXXX XXXX'
										value={values?.cardNumber || ''}
										onChangeText={text => handleChange(text, "cardNumber")}
									/>

									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='Fecha de expiración'
										placeholder='XX/XX'
										value={values?.cardExpiration || ''}
										onChangeText={text => handleChange(text, "cardExpiration")}
									/>
								</View>


								<View style={{ ...gloStyles?.inputs?.row }}>
									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='Nombre y apellidos del titular'
										placeholder='Nombre y apellidos del titular'
										value={values?.cardHolder || user?.metadata?.fullname.toUpperCase()}
										onChangeText={text => handleChange(text, "cardHolder")}
									/>
								</View>
							</>
						),
						'business': (
							<>
								<View style={{ ...gloStyles?.inputs?.row }}>
									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='IBAN'
										placeholder='XXXX XXXX XXXX XX XXXXXXXXXX'
										value={values?.IBAN || ''}
										onChangeText={text => handleChange(text, "IBAN")}
									/>

									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='Nombre y apellidos del titular'
										placeholder='Nombre y apellidos del titular'
										value={values?.IBANHolder || user?.metadata?.fullname.toUpperCase()}
										onChangeText={text => handleChange(text, "IBANHolder")}
									/>
								</View>
							</>
						),
						'worker': (
							<>
								<View style={{ ...gloStyles?.inputs?.row }}>
									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='IBAN'
										placeholder='XXXX XXXX XXXX XX XXXXXXXXXX'
										value={values?.IBAN || ''}
										onChangeText={text => handleChange(text, "IBAN")}
									/>

									<Input
										style={{ ...gloStyles?.inputs?.input }}
										label='Nombre y apellidos del titular'
										placeholder='Nombre y apellidos del titular'
										value={values?.IBANHolder || user?.metadata?.fullname.toUpperCase()}
										onChangeText={text => handleChange(text, "IBANHolder")}
									/>
								</View>
							</>
						)
					}[user?.role]
				}
			</View>
		</View>
	)
};

BankDataForm.propTypes = {
	debug: PropTypes.bool.isRequired,
};

BankDataForm.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
