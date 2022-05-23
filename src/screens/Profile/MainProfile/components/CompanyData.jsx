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
import { Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Hooks
import { useProvinceTown } from '../../../../hooks/useProvinceTown'

//Select Options
const workerOptions = [
	{
		name: true,
		value: 'Sí'
	},
	{
		name: false,
		value: 'No'
	},
];


// eslint-disable-next-line no-unused-vars
export const CompanyDataForm = ({ debug }) => {
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
		name: user?.metadata?.name || "",
		fullname: user?.metadata?.fullname || "",
		cif: user?.metadata?.cif || "",
		email: user?.metadata?.email || "",
		phoneNumber: user?.metadata?.phoneNumber || "",
		postalCode: user?.metadata?.postalCode || "",
		province: user?.metadata?.province || "",
		town: user?.metadata?.town || "",
		hasWorkers: user?.metadata?.hasWorkers || "",
	})

	useEffect(() => {
		setValues({
			name: changesToSave?.metadata?.name || user?.metadata?.name || "",
			fullname: changesToSave?.metadata?.fullname || user?.metadata?.fullname || "",
			cif: changesToSave?.metadata?.cif || user?.metadata?.cif || "",
			email: changesToSave?.metadata?.email || user?.metadata?.email || "",
			phoneNumber: changesToSave?.metadata?.phoneNumber || user?.metadata?.phoneNumber || "",
			postalCode: changesToSave?.metadata?.postalCode || user?.metadata?.postalCode || "",
			province: changesToSave?.metadata?.province || user?.metadata?.province || "",
			town: changesToSave?.metadata?.town || user?.metadata?.town || "",
			hasWorkers: changesToSave?.metadata?.hasWorkers || user?.metadata?.hasWorkers || ""
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
		const newMetadata = { ...values }
		newMetadata[keyName] = value;
		if (keyName === 'name') {
			newMetadata['fullname'] = `${value} ${values?.cif}`;
		}
		if (keyName === 'cif') {
			newMetadata['fullname'] = `${values?.name} ${value}`;
		}
		//consola('normal','📜 PEDA - newMetadata')
		//consola('normal',newMetadata)

		dispatch(updateChangesToSave({ metadata: newMetadata }, false))
	}

	//Hooks
	const [setPostalCode, province, townsList, townsSelectedIndex, setTownsSelectedIndex, townDisplayValue] = useProvinceTown(values.postalCode, values.province, values.town);

	useEffect(() => {
		setValues(prevValues => {
			return {
				...prevValues,
				province
			}
		})
	}, [province]);

	const townRenderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	//Select
	const [selectedIndex, setSelectedIndex] = useState(
		workerOptions.findIndex(wO => wO.name === user?.metadata?.hasWorkers) !== -1
			? new IndexPath(workerOptions.findIndex(wO => wO.name === user?.metadata?.hasWorkers))
			: new IndexPath(0));
	const displayValue = workerOptions[selectedIndex.row].value;
	const renderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'person-outline'} primaryText={'Datos de la empresa'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				<View style={{ ...gloStyles?.inputs?.row }}>
					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Nombre'
						placeholder='Introduce tu nombre'
						value={values?.name || ''}
						onChangeText={text => handleChange(text, "name")}
					/>

					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='CIF'
						placeholder='Introduce el CIF de la empresa'
						value={values?.cif || ''}
						onChangeText={text => handleChange(text, "cif")}
					/>
				</View>

				<View style={{ ...gloStyles?.inputs?.row }}>
					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Correo electrónico'
						placeholder='Introduce tu correo electrónico'
						value={values?.email || ''}
						onChangeText={text => handleChange(text, "email")}
					/>

					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Número de teléfono'
						placeholder='Introduce tu número de teléfono'
						value={values?.phoneNumber || ''}
						onChangeText={text => handleChange(text, "phoneNumber")}
					/>
				</View>

				<View style={{ ...gloStyles?.inputs?.row }}>
					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Código postal'
						placeholder='XXXXX'
						value={values?.postalCode || ''}
						onChangeText={text => {
							handleChange(text, "postalCode")
							setPostalCode(text)
						}}
					/>
					<Input
						style={{ ...gloStyles?.inputs?.input, ...gloStyles?.colorPrimary500 }}
						label='Provincia'
						placeholder='Provincia'
						value={province}
					/>
				</View>

				<View style={{ ...gloStyles?.inputs?.row }}>
					<Select
						style={{ ...gloStyles.inputs.select }}
						label='Población'
						value={townDisplayValue}
						selectedIndex={townsSelectedIndex}
						onSelect={index => {
							setTownsSelectedIndex(index)
							handleChange(townsList[index - 1]?.NOMBRE, "town")
						}}>
						{townsList?.map(tL => tL?.NOMBRE)?.map(townRenderOption)}
					</Select>
				</View>

				<View style={{ ...gloStyles?.inputs?.row }}>
					<Select
						style={{ ...gloStyles.inputs.select }}
						label='¿Tienes empleados?'
						value={displayValue}
						selectedIndex={selectedIndex}
						onSelect={index => {
							setSelectedIndex(index)
							handleChange(workerOptions[index - 1].name, "hasWorkers")
						}}>
						{workerOptions.map(uT => uT.value).map(renderOption)}
					</Select>
				</View>
			</View>
		</View>
	)
};

CompanyDataForm.propTypes = {
	debug: PropTypes.bool.isRequired,
};

CompanyDataForm.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
