import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Store
import { useSelector } from 'react-redux'

//Data
import { servicesTypes } from '../../../data/servicesTypes'

//Hooks
import { useFirebaseSaveServiceDetail } from "../../../hooks/useFirebaseSaveServiceDetail"

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Layout, Button, Text, Input, Icon } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { TitleSection } from '../../../components/Titles/Section'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { TruckIcon } from '../../../assets/icons/Truck'

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

// eslint-disable-next-line no-unused-vars
export const ResumeServiceRequestScreen = ({ debug, navigation }) => {

	//Store
	const serviceTemporal = useSelector(state => state.serviceReducer.serviceTemporal);

	//State
	// eslint-disable-next-line no-unused-vars
	const [isEdit, setIsEdit] = useState(false);

	const [values, setValues] = useState(serviceTemporal)

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const [saved, setSaved, handleRemoveServiceDetail, handleSaveServiceDetail, handleSaveService] = useFirebaseSaveServiceDetail(debug)

	const renderCaption = (caption) => {
		return (
			<Text style={{ ...gloStyles.inputs.captionText }}>{caption}</Text>
		)
	}

	function handleDetailsChange(value) {
		setValues(prevValues => {
			return {
				...prevValues,
				details: value
			}
		})
	}

	const [sdidToRemove, setSdidToRemove] = useState(undefined);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	function removeDetail() {
		handleRemoveServiceDetail(sdidToRemove)
		const newDetails = values?.details.filter((item) => item.sdid != sdidToRemove);
		handleDetailsChange(newDetails);
		setShowDeleteConfirm(false)
	}

	function handleInputChange(value, keyName, indexDetail) {
		let details = values.details;
		details[indexDetail].inputs[keyName] = value;
		setValues(prevValues => {
			return {
				...prevValues,
				details
			}
		})
	}

	function hideModal() {
		setSdidToRemove(undefined)
		setShowDeleteConfirm(false)
	}

	useEffect(() => {
		if (saved) {
			navigation.push("ScheduleRequestScreen", { sid: saved })
		}
	}, [saved]);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen />
							<View style={{ ...gloStyles.view }}>

								<View style={{ ...gloStyles.section.fullStart }}>

									{/*TITULO TOP*/}
									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 }, secondaryText: { marginTop: 10 } }} primaryText={'Resumen del nuevo servicio'} secondaryText={'Revisa los detalles del servicio a solicitar. A continuación podrás seleccionar los horarios que mejor te vengan y las empresas que más te gusten.'} />

									<SeparatorTopSection />

									{/*SECCIÓN SERVICIOS*/}
									<View style={{ ...ownStyles.servicesWrapper }}>

										{values?.details?.length > 0 && values?.details?.map((detail, indexDetail) => {
											//console.log('detail', detail)

											return (
												//SERVICIO
												<View key={detail.sdid} style={{ ...ownStyles.serviceWrapper }}>
													<View style={{ ...ownStyles.viewWrapperTop }}>

														{/*DETALLE*/}
														<Text style={{ ...ownStyles.textDetalleTop }}>
															{`#️ Detalle ${indexDetail + 1}`}
														</Text>

														{/*ICONO ELIMINAR*/}
														<TouchableWithoutFeedback
															onPress={() => {
																setSdidToRemove(detail.sdid)
																setShowDeleteConfirm(true)
															}}>
															<Icon
																name='close'
																fill={ownStyles.iconCloseTop.fill}
																width={ownStyles.iconCloseTop.width}
																height={ownStyles.iconCloseTop.height}
															/>
														</TouchableWithoutFeedback>
													</View>

													{/*TITULO SECCIÓN SERVICIO*/}
													<TitleSection icon={''}
														exterStyles={
															{
																wrapper: {
																	marginBottom: Device?.isPhone ? 15 : 20
																},
																primaryText: {
																	fontSize: Device?.isPhone ? 22 : 24,
																	lineHeight: Device?.isPhone ? 25 : undefined
																}
															}
														}
														primaryText={`${servicesTypes.find((type) => type.identifier === detail.type).label}`}
														secondaryText={''}
													/>

													{/*MAIN TYPE*/}
													<View>
														<Text style={{ ...ownStyles.textQuestion }}>
															{`${servicesTypes.find((type) => type.id === detail.typeId).question}`}
														</Text>
														<Text style={{ ...ownStyles.textResponse }}>
															{
																`${servicesTypes.find((type) => type.identifier === detail.type)
																	?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
																	?.label
																}`
															}
														</Text>
													</View>

													{/*STEP 1*/}
													{detail.step1 !== '' && (
														<View>
															<Text style={{ ...ownStyles.textQuestion }}>
																{`${servicesTypes.find((type) => type.id === detail.typeId).question}`}
															</Text>
															<Text style={{ ...ownStyles.textResponse }}>
																{
																	`${servicesTypes.find((type) => type.identifier === detail.type)
																		?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
																		?.label
																	}`
																}
															</Text>
														</View>
													)}

													{/*STEP 2*/}
													{detail.step2 !== '' && (
														<View>
															<Text style={{ ...ownStyles.textQuestion }}>
																{`${servicesTypes.find((type) => type.id === detail.typeId).step1types.find((type1) => type1.step1typeId === detail.step1id).question}`}
															</Text>
															<Text style={{ ...ownStyles.textResponse }}>
																{
																	`${servicesTypes.find((type) => type.identifier === detail.type)
																		?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
																		?.step2types?.find((type2) => type2.step2typeId === detail.step2id)
																		?.label
																	}`
																}
															</Text>
														</View>
													)}

													{/*STEP 3*/}
													{detail.step3 !== '' && (
														<View>
															<Text style={{ ...ownStyles.textQuestion }}>
																{`${servicesTypes.find((type) => type.id === detail.typeId).step1types.find((type1) => type1.step1typeId === detail.step1id).step2types.find((type2) => type2.step2typeId === detail.step2id).question}`}
															</Text>
															<Text style={{ ...ownStyles.textResponse }}>
																{
																	`${servicesTypes.find((type) => type.identifier === detail.type)
																		?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
																		?.step2types?.find((type2) => type2.step2typeId === detail.step2id)
																		?.step3types?.find((type3) => type3.step3typeId === detail.step3id)
																		?.label
																	}`
																}
															</Text>
														</View>
													)}

													{/*INPUTS LEVEL 1*/}
													{
														servicesTypes?.find((type) => type.id === detail.typeId)
															?.step1types?.find((type1) => type1.step1typeId === detail.step1id)?.inputs
															?.length > 0
														&&
														servicesTypes?.find((type) => type.id === detail.typeId)
															?.step1types?.find((type1) => type1.step1typeId === detail.step1id)?.inputs
															?.map((input) => {
																//console.log('input1', input)
																return (
																	<Input
																		key={input.inputId}
																		style={{ ...gloStyles?.inputs?.input }}
																		label={input.label}
																		caption={renderCaption(input.caption)}
																		placeholder={input.placeholder}
																		value={detail.inputs[input?.identifier] || ''}
																		onChangeText={text => handleInputChange(text, input.identifier, indexDetail)}
																		multiline={input.type === 'textarea'}
																		textStyle={input.type === 'textarea' && { minHeight: 144 }}
																	/>
																)
															})
													}

													{/*INPUTS LEVEL 2*/}
													{
														servicesTypes?.find((type) => type.id === detail.typeId)
															?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
															?.step2types?.find((type2) => type2.step2typeId === detail.step2id)?.inputs
															?.length > 0
														&&
														servicesTypes?.find((type) => type.id === detail.typeId)
															?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
															?.step2types?.find((type2) => type2.step2typeId === detail.step2id)?.inputs
															?.map(input => {
																//console.log('input2', input)
																return (
																	<Input
																		key={input.inputId}
																		style={{ ...gloStyles?.inputs?.input }}
																		label={input.label}
																		caption={renderCaption(input.caption)}
																		placeholder={input.placeholder}
																		value={detail.inputs[input?.identifier] || ''}
																		onChangeText={text => handleInputChange(text, input.identifier)}
																		multiline={input.type === 'textarea'}
																		textStyle={input.type === 'textarea' && { minHeight: 144 }}
																	/>
																)
															})
													}

													{/*INPUTS LEVEL 3*/}
													{
														servicesTypes?.find((type) => type.id === detail.typeId)
															?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
															?.step2types?.find((type2) => type2.step2typeId === detail.step2id)
															?.step3types?.find((type3) => type3.step3typeId === detail.step3id)?.inputs
															?.length > 0
														&&
														servicesTypes?.find((type) => type.id === detail.typeId)
															?.step1types?.find((type1) => type1.step1typeId === detail.step1id)
															?.step2types?.find((type2) => type2.step2typeId === detail.step2id)
															?.step3types?.find((type3) => type3.step3typeId === detail.step3id)?.inputs
															?.map(input => {
																//console.log('input3', input)
																return (
																	<Input
																		key={input.inputId}
																		style={{ ...gloStyles?.inputs?.input }}
																		label={input.label}
																		caption={renderCaption(input.caption)}
																		placeholder={input.placeholder}
																		value={detail.inputs[input?.identifier] || ''}
																		onChangeText={text => handleInputChange(text, input.identifier)}
																		multiline={input.type === 'textarea'}
																		textStyle={input.type === 'textarea' && { minHeight: 144 }}
																	/>
																)
															})
													}
												</View>
											)
										})}

									</View>

									{/*BOTÓN AÑADIR OTRO DETALLE AL SERVICIO*/}
									<Button
										accessoryLeft={AddIcon} style={{ ...gloStyles?.button }} onPress={() => navigation.navigate("MainServiceRequestScreen", { reset: true })}>Añadir otro detalle al servicio</Button>

									{/*BOTÓN SOLICITAR SERVICIO*/}
									<Button
										accessoryLeft={TruckIcon} style={{ ...gloStyles?.button }} onPress={() => handleSaveService(values, isEdit)}>Solicitar servicio</Button>

									{/*MODAL ELIMINAR DETALLE*/}
									<ModalOptions mainText={'¿Seguro que quieres eliminar este detalle?'} show={showDeleteConfirm} setShow={setShowDeleteConfirm} option1text={'Sí, eliminar'} option1onPress={removeDetail} option2text={'No, mantener'} option2onPress={hideModal} />

								</View>
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

ResumeServiceRequestScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
};

ResumeServiceRequestScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
