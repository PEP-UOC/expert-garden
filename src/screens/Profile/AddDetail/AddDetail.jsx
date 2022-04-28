import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

import { View, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native"
import { Divider, Text, Button, Layout, Input, TopNavigation, TopNavigationAction, Select, SelectItem } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Icons
import { LeafIcon } from '../../../assets/icons/Leaf'
import { BackIcon } from '../../../assets/icons/Back'

//Data
import { gardenDetailTypes } from '../../../data/gardenDetailTypes'

//Hooks
import { useFirebaseSaveGardenDetail } from "../../../hooks/useFirebaseSaveGardenDetail"

//Lodash
import { forIn } from 'lodash';

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

//uuid
import uuid from 'react-native-uuid';

// eslint-disable-next-line no-unused-vars
export const AddDetailScreen = ({ debug, navigation, route }) => {
	const gardenId = route.params.gid;
	const gardenName = route.params.name;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [values, setValues] = useState({
		gdid: uuid.v4(),
		gid: gardenId,
		mainType: "",
		subType: "",
		inputs: {}
	})

	const resetForm = () => {
		setSelectedIndexMainType()
		setSelectedIndexSubType()
		setListInputs([])
		setShowSubType(false)
		setShowInputs(false)
		setValues({
			gdid: uuid.v4(),
			gid: gardenId,
			mainType: "",
			subType: "",
			inputs: {}
		})
		setSaved(false)
	};

	function handleChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value?.trim()
			}
		})
	}

	//Main Type
	const [selectedIndexMainType, setSelectedIndexMainType] = useState();
	const displayValueMainType = gardenDetailTypes[selectedIndexMainType?.row]?.value;

	//Sub Type
	const [showSubType, setShowSubType] = useState(false);
	const [listSubType, setListSubType] = useState([]);
	const [selectedIndexSubType, setSelectedIndexSubType] = useState();
	const displayValueSubType = listSubType[selectedIndexSubType?.row]?.value;

	//Inputs
	const [showInputs, setShowInputs] = useState(false);
	const [listInputs, setListInputs] = useState([]);
	function handleInputChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				inputs: { ...prevValues.inputs, [keyName]: value }
			}
		})
	}

	useEffect(() => {
		if (values?.mainType) {
			setShowInputs(false)
			setSelectedIndexSubType()
			setListSubType(gardenDetailTypes[selectedIndexMainType.row]?.subTypes)
			setShowSubType(true)
		}
	}, [values.mainType]);

	useEffect(() => {
		if (values?.subType && listSubType.length) {
			setListInputs(listSubType[selectedIndexSubType?.row]?.inputs)
			setShowInputs(true)
		}
	}, [values.subType]);

	//Input renders
	const renderOption = (title) => (
		<SelectItem key={title} title={title} />
	);
	const renderCaption = (caption) => {
		return (
			<Text style={{ ...gloStyles.inputs.captionText }}>{caption}</Text>
		)
	}

	//Save detail
	const [saved, setSaved, handleSaveGardenDetail] = useFirebaseSaveGardenDetail(debug)

	//Navigation
	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const navigateBack = () => {
		navigation.goBack();
	};

	const isDisabled = () => {
		let inputValuesArray = [];
		forIn(values?.inputs, (value) => {
			inputValuesArray.push(value)
		})
		return inputValuesArray?.every(isEmpty)
	}

	const isEmpty = (currentValue) => currentValue === '';

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: "space-around" }}>
						<TopNavigation title={''} alignment='center' accessoryLeft={BackAction} />
						<Divider />
						<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
							contentContainerStyle={{ ...gloStyles?.scrollView, ...ownStyles?.scrollHeight }}>
							<Layout style={{ ...gloStyles?.layout }}>
								<SeparatorTopScreen />
								<View style={{ ...gloStyles?.view }}>
									<View style={{ ...gloStyles.section.full }}>
										<Text category='h6' style={{ ...gloStyles?.h6, ...ownStyles?.topSubTitle }}>AÑADIR DETALLE A</Text>
										<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle }}>{gardenName}</Text>

										<View style={{ ...gloStyles?.inputs?.row }}>
											<Select
												style={{ ...gloStyles.inputs.select }}
												label='Tipo'
												placeholder='Selecciona un tipo'
												value={displayValueMainType}
												selectedIndex={selectedIndexMainType}
												onSelect={index => {
													setSelectedIndexMainType(index)
													handleChange(gardenDetailTypes[index - 1].name, "mainType")
												}}>
												{gardenDetailTypes.map(gdT => gdT.value).map(renderOption)}
											</Select>

											{showSubType &&
												(
													<Select
														style={{ ...gloStyles.inputs.select }}
														label='SubTipo'
														placeholder='Selecciona un subtipo'
														value={displayValueSubType}
														selectedIndex={selectedIndexSubType}
														onSelect={index => {
															setSelectedIndexSubType(index)
															handleChange(listSubType[index - 1].name, "subType")
														}}>
														{listSubType.map(sT => sT.value).map(renderOption)}
													</Select>
												)}

											{showInputs && listInputs.map(input => {
												return (
													<Input
														key={input.inputId}
														style={{ ...gloStyles?.inputs?.input }}
														label={input.label}
														caption={renderCaption(input.caption)}
														placeholder={input.placeholder}
														value={values.inputs[input?.name] || ''}
														onChangeText={text => handleInputChange(text, input.name)}
														multiline={input.type === 'textarea'}
														textStyle={input.type === 'textarea' && { minHeight: 96 }}
													/>
												)
											})
											}

										</View>

										<Button style={{ ...gloStyles?.button }} onPress={() => handleSaveGardenDetail(values)} disabled={isDisabled()}>Guardar detalle</Button>

										<Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={navigateBack}>Volver</Button>

										<ModalOptions mainText={'Guardado!'} show={saved} setShow={setSaved} option1text={'Añadir otro detalle'} option1onPress={resetForm} option2text={'Volver al jardín'} option2onPress={navigateBack} />

										<View style={{ alignItems: 'center' }}>
											<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
										</View>

									</View>
								</View>
							</Layout>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

AddDetailScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

AddDetailScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
