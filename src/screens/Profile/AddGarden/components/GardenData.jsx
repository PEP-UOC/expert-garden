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
		address: "",
		addressExtra: "",
		postalCode: "",
		province: "",
		town: ""
	})

	//Hooks
	const { loading: gardenLoading, result: garden, error: gardenError } = useFirebaseGetOne(debug, 'gardens', 'gid', gid);

	const [setPostalCode, province, townsList, townsSelectedIndex, setTownsSelectedIndex, townDisplayValue] = useProvinceTown(values.postalCode, values.province, values.town);

	//Handle
	function handleChange(value, keyName, auto = false) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value?.trim()
			}
		})
		const newGarden = { ...values }
		newGarden[keyName] = value?.trim();
		//console.log('🌳 GDAT - newGarden', newGarden)

		const gardensArray = [...changesToSave?.gardens || []];
		gardensArray[gardenIndex] = newGarden;
		//console.log('🌳 GDAT - gardensArray', gardensArray)

		dispatch(updateChangesToSave({ gardens: gardensArray }, !auto))
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
				address: garden?.address || "",
				addressExtra: garden?.addressExtra || "",
				postalCode: garden?.postalCode || "",
				province: garden?.province || "",
				town: garden?.town || ""
			})
			setPostalCode(garden?.postalCode)
			console.log('new IndexPath(townsList.findIndex((town) => town.NOMBRE === garden?.town))', new IndexPath(townsList.findIndex((town) => town.NOMBRE === garden?.town)))
			setTownsSelectedIndex(new IndexPath(townsList.findIndex((town) => town.NOMBRE === garden?.town)))
			setLoadFormValues(false);
		}
	}, [loadFormValues]);

	useEffect(() => {
		//console.log(`🌀 GDAT - Cargando   ${gid} | ${gardenLoading}`)
	}, [gardenLoading]);

	useEffect(() => {
		if (garden?.gid) {
			//console.log(`🍀 GDAT - Jardín     ${gid} |`, garden?.type)
			setLoadFormValues(true);
		}
	}, [garden]);

	useEffect(() => {
		if (gardenError) {
			console.log(`🩸 GDAT - Error   ${gid} | ${gardenError}`)
			dispatch(setErrorMessage(gardenError))
		}
	}, [gardenError]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'person-outline'} primaryText={'Localización'} secondaryText={''} />
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
