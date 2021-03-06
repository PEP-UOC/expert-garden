/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles';
import styles from './styles';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { updateChangesToSave } from '../../../../store/change/changeAction';
import { setLoadingMessage } from '../../../../store/root/rootAction';

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { Button, Card, Input, Select, SelectItem, Text } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';

//Icons
import { GridIcon } from '../../../../assets/icons/Grid';

//Hooks
import { useProvinceTown } from '../../../../hooks/useProvinceTown'

// eslint-disable-next-line no-unused-vars
export const GardenItem = ({ debug, garden }) => {
	const dispatch = useDispatch()

	//Navigation
	const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const changesToSave = useSelector(state => state.changeReducer.changesToSave);

	//Inputs State
	const [values, setValues] = useState({
		gid: garden?.item?.gid || "",
		name: garden?.item?.name || "",
		description: garden?.item?.description || "",
		address: garden?.item?.address || "",
		addressExtra: garden?.item?.addressExtra || "",
		postalCode: garden?.item?.postalCode || "",
		province: garden?.item?.province || "",
		town: garden?.item?.town || ""
	})

	//Handle
	function handleChange(value, keyName, auto = false) {
		if (value) {
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
			gardensArray[garden?.index] = newGarden;
			//consola('normal','🌳 GDAT - gardensArray')
			//consola('normal',gardensArray)

			dispatch(updateChangesToSave({ gardens: gardensArray }, auto))
		}
	}

	const renderItemHeader = (headerProps, garden) => {
		return (
			<View {...headerProps}>
				<Text category='h6'>
					{garden?.item?.name}
				</Text>
				<Text category='c1'>
					{garden?.item?.description || ' '}
				</Text>
			</View>
		)
	};

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

	if (garden?.item?.name === 'CHALET') {
		//consola('normal','⛱  DEBU - townDisplayValue')
		//consola('normal',townDisplayValue)
	}

	const townRenderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	//Add Garden
	if (garden?.item?.name === 'addGarden') {
		return (
			<Card
				style={{ ...ownStyles?.garden?.cardAddGarden }}
				status='primary'
			>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						consola('normal', `🕳  GADN - Dispatch Loading START`);
						dispatch(setLoadingMessage(debug ? '🔧 Cargando' : 'Cargando'));
						navigation.push("GardenAddScreen", { index: garden?.index })
					}}
				>
					<View style={{ ...gloStyles?.inputs?.row, ...ownStyles?.garden?.row }}>
						<GridIcon
							fill={ownStyles?.addGardenIcon?.fill}
							width={120}
							height={80}
						/>
						<Text category='p1' style={{ ...gloStyles?.textCenter }}>Añadir jardín</Text>
					</View>
				</TouchableOpacity>
			</Card>
		)
	}

	//Saved Garden
	return (
		<Card
			style={{ ...ownStyles?.garden?.card }}
			status='primary'
			header={headerProps => renderItemHeader(headerProps, garden)}
		>
			<View style={{ ...gloStyles?.inputs?.row, ...ownStyles?.garden?.row }}>
				<Input
					style={{ ...gloStyles?.inputs?.input }}
					label='Dirección completa'
					placeholder='Dirección'
					value={values?.address || ''}
					onChangeText={text => handleChange(text, "address")}
				/>

				<Input
					style={{ ...gloStyles?.inputs?.input }}
					placeholder='Puerta, bajo, escalera...'
					value={values?.addressExtra || ''}
					onChangeText={text => handleChange(text, "addressExtra")}
				/>
			</View>

			<View style={{ ...gloStyles?.inputs?.row, ...ownStyles?.garden?.row }}>
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

			<View style={{ ...gloStyles?.inputs?.row, ...ownStyles?.garden?.row }}>
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
				<Button
					style={
						{
							...gloStyles?.button,
							...ownStyles?.garden?.btnDetails
						}
					}
					size='medium'
					onPress={() => {
						consola('normal', `🕳  GADN - Dispatch Loading START`);
						dispatch(setLoadingMessage(debug ? '🔧 Cargando' : 'Cargando'));
						navigation.push("GardenDetailScreen", { gid: garden?.item?.gid, index: garden?.index })
					}}
					accessoryLeft={GridIcon}
				>
					Detalles
				</Button>
			</View>
		</Card>
	)
};

GardenItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	garden: PropTypes.object.isRequired,
};

GardenItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
