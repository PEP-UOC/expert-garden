import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { Text, Button, Layout, Input, TopNavigation, TopNavigationAction, Select, SelectItem, IndexPath } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useDispatch } from 'react-redux'
import { setLoadingMessage } from '../../../../store/root/rootAction';

//Icons
import { LeafIcon } from '../../../../assets/icons/Leaf'
import { BackIcon } from '../../../../assets/icons/Back'

//Data
import { gardenDetailTypes } from '../../../../data/gardenDetailTypes'

//Hooks
import { useFirebaseSaveGardenDetail } from "../../../../hooks/useFirebaseSaveGardenDetail"

//Lodash
import { forIn } from 'lodash';

//Modales
import { ModalOptions } from '../../../../components/Modals/Options';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//uuid
import uuid from 'react-native-uuid';

// eslint-disable-next-line no-unused-vars
export const DetailScreen = ({ debug, navigation, route }) => {
	const dispatch = useDispatch()

	const gardenId = route.params.gid;

	const [gardenDetailId, setGardenDetailId] = useState(route.params?.gdid || false);
	const [gardenDetail, setGardenDetail] = useState(route.params?.detail || false);

	const gardenName = route.params.name;

	const [isEdit, setIsEdit] = useState(false);

	//Edit
	const [autoFindSubType, setAutoFindSubType] = useState(false);
	useEffect(() => {
		if (gardenDetailId) {
			setValues(prevValues => {
				return {
					...prevValues,
					gdid: gardenDetail.gdid
				}
			})
			const mainIndex = gardenDetailTypes.findIndex(type => type.identifier === gardenDetail.mainType)
			setSelectedIndexMainType(new IndexPath(mainIndex))
			handleChange(gardenDetailTypes[mainIndex]?.identifier, "mainType")
			setIsEdit(true);
		}
	}, []);

	useEffect(() => {
		if (gardenDetailId) {
			const subIndex = listSubType.findIndex(type => type.identifier === gardenDetail.subType)
			setSelectedIndexSubType(new IndexPath(subIndex))
			handleChange(listSubType[subIndex]?.identifier, "subType")
			setValues(prevValues => {
				return {
					...prevValues,
					inputs: gardenDetail.inputs
				}
			})
		}
	}, [autoFindSubType]);

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
		console.log(`🕳  DETA - Dispatch Loading STOP`);
		dispatch(setLoadingMessage(false));
		setGardenDetailId(false)
		setGardenDetail(false)
		setIsEdit(false)
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
				[keyName]: value
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
			setAutoFindSubType(true)
		}
	}, [values.mainType]);

	useEffect(() => {
		if (values?.subType && listSubType?.length) {
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
		console.log(`🕳  DETA - Dispatch Loading STOP`);
		dispatch(setLoadingMessage(false));
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
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<TopNavigation title={''} alignment='center' accessoryLeft={BackAction} />
					<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
						contentContainerStyle={{ ...gloStyles?.scrollView }}>
						<Layout style={{ ...gloStyles?.layout }}>
							<View style={{ ...gloStyles?.view, alignItems: 'flex-start' }}>
								<View style={{ ...gloStyles.section.fullStart }}>
									<Text category='h6' style={{ ...gloStyles?.h6, ...ownStyles?.topSubTitle }}>{isEdit ? 'EDITAR DETALLE DE' : 'AÑADIR DETALLE A'}</Text>
									<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle }}>{gardenName}</Text>

									<View style={{ ...gloStyles?.inputs?.row, width: Device?.isPhone ? '100%' : 700, justifyContent: showSubType ? 'space-between' : 'center' }}>
										<Select
											style={{ ...gloStyles.inputs.select }}
											label='Tipo'
											placeholder='Selecciona un tipo'
											value={displayValueMainType}
											selectedIndex={selectedIndexMainType}
											onSelect={index => {
												setSelectedIndexMainType(index)
												handleChange(gardenDetailTypes[index - 1]?.identifier, "mainType")
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
														handleChange(listSubType[index - 1]?.identifier, "subType")
													}}>
													{listSubType.map(sT => sT.value).map(renderOption)}
												</Select>
											)}


									</View>
									{showInputs && listInputs?.map(input => {
										return (
											<Input
												key={input.inputId}
												style={{ ...gloStyles?.inputs?.input }}
												label={input.label}
												caption={renderCaption(input.caption)}
												placeholder={input.placeholder}
												value={values.inputs[input?.identifier] || ''}
												onChangeText={text => handleInputChange(text, input.identifier)}
												multiline={input.type === 'textarea'}
												textStyle={input.type === 'textarea' && { minHeight: 96 }}
											/>
										)
									})
									}

									<Button style={{ ...gloStyles?.button, marginBottom: 20 }} onPress={() => handleSaveGardenDetail(values, isEdit)} disabled={isDisabled()}>Guardar detalle</Button>

									<Button style={{ ...gloStyles?.buttonGhost }} appearance='ghost' onPress={navigateBack}>Volver</Button>

									<ModalOptions mainText={'Guardado!'} show={saved} setShow={setSaved} option1text={'Añadir otro detalle'} option1onPress={resetForm} option2text={'Volver al jardín'} option2onPress={navigateBack} backdropPress={() => { return }} />

									<View style={{ alignItems: 'center' }}>
										<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
									</View>

								</View>
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

DetailScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

DetailScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
