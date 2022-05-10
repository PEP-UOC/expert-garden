import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

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
import { Input, Select, SelectItem } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Hooks
import { useProvinceTown } from '../../../../hooks/useProvinceTown'

// eslint-disable-next-line no-unused-vars
export const CompanyDataForm = ({ debug }) => {
	const dispatch = useDispatch()

	//const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//State
	const [values, setValues] = useState({
		name: user?.metadata?.name || "",
		fullname: user?.metadata?.fullname || "",
		cif: user?.metadata?.cif || "",
		email: user?.metadata?.email || "",
		phoneNumber: user?.metadata?.phoneNumber || "",
		postalCode: user?.metadata?.postalCode || "",
		province: user?.metadata?.province || "",
		town: user?.metadata?.town || ""
	})

	useEffect(() => {
		setValues({
			name: user?.metadata?.name || "",
			fullname: user?.metadata?.fullname || "",
			cif: user?.metadata?.cif || "",
			email: user?.metadata?.email || "",
			phoneNumber: user?.metadata?.phoneNumber || "",
			postalCode: user?.metadata?.postalCode || "",
			province: user?.metadata?.province || "",
			town: user?.metadata?.town || ""
		})
	}, [user]);

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
		//console.log('📜 PEDA - newMetadata', newMetadata)

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
