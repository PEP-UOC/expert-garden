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
import { setErrorMessage } from '../../../../store/root/rootAction';
import { updateChangesToSave } from '../../../../store/change/changeAction';

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Hooks
import useFirebaseGetOne from '../../../../hooks/useFirebaseGetOne'
import { useProvinceTown } from '../../../../hooks/useProvinceTown'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

// eslint-disable-next-line no-unused-vars
export const GardenDataForm = ({ debug, gid, gardenIndex }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const changesToSave = useSelector(state => state.changeReducer.changesToSave);

	//State
	const [values, setValues] = useState({
		gid: "",
		name: "",
		description: "",
		address: "",
		addressExtra: "",
		postalCode: "",
		province: "",
		town: ""
	})

	//Hooks
	const { loading: gardenLoading, result: garden, error: gardenError } = useFirebaseGetOne(debug, 'gardens', 'gid', gid);

	const [setPostalCode, province, townsList, townsSelectedIndex, setTownsSelectedIndex, townDisplayValue] = useProvinceTown(values.postalCode, values.province, values.town);

	useEffect(() => {
		setValues(prevValues => {
			return {
				...prevValues,
				province
			}
		})
	}, [province]);

	//Handle
	function handleChange(value, keyName, auto = false) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
		const newGarden = { ...values }
		newGarden[keyName] = value;
		//consola('normal','🌳 GDAT - newGarden')
		//consola('normal',newGarden)

		const gardensArray = [...changesToSave?.gardens || []];
		gardensArray[gardenIndex] = newGarden;
		//consola('normal','🌳 GDAT - gardensArray')
		//consola('normal',gardensArray)

		dispatch(updateChangesToSave({ gardens: gardensArray }, auto))
	}

	const townRenderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	//State
	const [loadFormValues, setLoadFormValues] = useState(false);

	useEffect(() => {
		if (loadFormValues) {
			setValues({
				gid: garden?.gid || "",
				name: garden?.name || "",
				description: garden?.description || "",
				address: garden?.address || "",
				addressExtra: garden?.addressExtra || "",
				postalCode: garden?.postalCode || "",
				province: garden?.province || "",
				town: garden?.town || ""
			})
			setPostalCode(garden?.postalCode)
			setTownsSelectedIndex(new IndexPath(townsList.findIndex((town) => town.NOMBRE === garden?.town)))
			setLoadFormValues(false);
		}
	}, [loadFormValues]);

	useEffect(() => {
		//consola('normal',`🌀 GDAT - Cargando   ${gid} | ${gardenLoading}`)
	}, [gardenLoading]);

	useEffect(() => {
		if (garden?.gid) {
			//consola('normal',`🍀 GDAT - Jardín     ${gid} | ${garden?.name}`)
			setLoadFormValues(true);
		}
	}, [garden]);

	useEffect(() => {
		if (gardenError) {
			consola('error', `🩸 GDAT - Error   ${gid} | ${gardenError}`)
			dispatch(setErrorMessage(gardenError))
		}
	}, [gardenError]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'clipboard-outline'} primaryText={'General'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper, marginBottom: 20 }}>
				<View style={{ ...gloStyles?.inputs?.row, flexDirection: 'column' }}>
					<Input
						style={{ ...gloStyles?.inputs?.input, width: '100%' }}
						label='Nombre del jardín'
						placeholder={garden?.name}
						value={values?.name || ''}
						onChangeText={text => handleChange(text, "name")}
					/>

					<Input
						style={{ ...gloStyles?.inputs?.input, width: '100%' }}
						label={'Descripción'}
						placeholder='Descripción del jardín...'
						value={values?.description || ''}
						onChangeText={text => handleChange(text, "description")}
						multiline={true}
						textStyle={{ minHeight: 96 }}
					/>
				</View>
			</View>

			<TitleSection icon={'pin-outline'} primaryText={'Localización'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				<View style={{ ...gloStyles?.inputs?.row }}>
					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Dirección completa'
						placeholder='Dirección'
						value={values?.address || ''}
						onChangeText={text => handleChange(text, "address")}
					/>

					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label={Device.isPhone ? '' : ' '}
						placeholder='Puerta, bajo, escalera...'
						value={values?.addressExtra || ''}
						onChangeText={text => handleChange(text, "addressExtra")}
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
			</View>
		</View>
	)
};

GardenDataForm.propTypes = {
	debug: PropTypes.bool.isRequired,
	gid: PropTypes.string.isRequired,
	gardenIndex: PropTypes.number.isRequired,
};

GardenDataForm.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
