import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet, IndexPath } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles';
import styles from './styles';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingMessage } from '../../../../store/root/rootAction';
import { updateHasNotSavedChanges, updateUserTemporal } from '../../../../store/user/userAction';

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View, TouchableOpacity } from 'react-native';
import { Button, Card, Input, Select, SelectItem, Text } from '@ui-kitten/components';

//Data
import { provinces } from '../../../../data/provinces';
import { towns } from '../../../../data/towns';

//Icons
import { GridIcon } from '../../../../assets/icons/Grid';

// eslint-disable-next-line no-unused-vars
export const GardenItem = ({ debug, garden }) => {
	const dispatch = useDispatch()

	//Navigation
	const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const userTemporal = useSelector(state => state.userReducer.userTemporal);

	//Inputs State
	const [values, setValues] = useState({
		gid: garden?.item?.gid || "",
		address: garden?.item?.address || "",
		addressExtra: garden?.item?.addressExtra || "",
		postalCode: garden?.item?.postalCode || "",
		province: garden?.item?.province || "",
		town: garden?.item?.town || ""
	})

	//Handle
	function handleChange(value, keyName, auto = false) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
		const gardens = { ...values }
		gardens[keyName] = value.trim();
		//console.log('gardens', gardens)
		const gardensArray = [...userTemporal?.gardens || []];
		gardensArray[garden?.index] = gardens;
		dispatch(updateUserTemporal({ gardens: gardensArray }))
		if (!auto) {
			dispatch(updateHasNotSavedChanges())
		}
	}

	const renderItemHeader = (headerProps, garden) => {
		return (
			<View {...headerProps}>
				<Text category='h6'>
					{garden?.item?.type}
				</Text>
			</View>
		)
	};

	//Provinces
	useEffect(() => {
		const provinceFound = provinces.find(
			(province) => province.value.substring(0, 2) === values.postalCode.substring(0, 2)
		)
		provinceFound ? handleChange(provinceFound?.label, "province", true) : handleChange("", "province", true);
	}, [values.postalCode]);

	//Towns
	const [townsList, setTownsList] = useState([])

	useEffect(() => {
		const provinceFound = provinces.find(
			(province) => province.label === values.province
		)
		const townsList = towns.filter(
			(town) => town.CPRO === provinceFound?.value
		)
		setTownsList(townsList);
	}, [values.province]);

	const [townsSelectedIndex, setTownsSelectedIndex] = useState(
		townsList.findIndex(town => town.NOMBRE === values?.town) !== -1
			? new IndexPath(townsList.findIndex(town => town.NOMBRE === values?.town))
			: new IndexPath(0));

	const [townDisplayValue, setTownDisplayValue] = useState(townsList[townsSelectedIndex.row]?.NOMBRE);

	useEffect(() => {
		const index = townsList.findIndex(town => town.NOMBRE === values?.town)
		setTownDisplayValue(townsList[index]?.NOMBRE)
	}, [values.town, townsList]);

	const townRenderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	useEffect(() => {
		//console.log('garden', garden)
	}, []);

	//Add Garden
	if (garden?.item?.type === 'addGarden') {

		return (
			<Card
				style={{ ...ownStyles?.garden?.cardAddGarden }}
				status='primary'
			>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.push("AddGardenScreen", { garden })}
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
					onChangeText={text => handleChange(text, "postalCode")}
				/>
				<Input
					style={{ ...gloStyles?.inputs?.input, ...gloStyles?.colorPrimary500 }}
					label='Provincia'
					placeholder='Provincia'
					value={values?.province || ''}
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
						handleChange(townsList[index - 1].NOMBRE, "town")
					}}>
					{townsList.map(tL => tL.NOMBRE).map(townRenderOption)}
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
						dispatch(setLoadingMessage(debug ? '🔧 Cargando' : 'Cargando'))
						navigation.push("GardenDetailScreen", { gid: garden?.item?.gid })
					}}
					accessoryLeft={GridIcon}
				>
					Más detalles
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
