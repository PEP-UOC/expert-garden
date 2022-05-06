import React, { useEffect, useState, useRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../../store/root/rootAction';

//Data
import { servicesTypes } from '../../../data/servicesTypes'

//Hooks
import { useFirebaseSaveServiceDetail } from "../../../hooks/useFirebaseSaveServiceDetail"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Animated } from 'react-native'
import { Layout, Button, Text, Input, Icon } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { TitleSection } from '../../../components/Titles/Section'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'

//Lodash
import { forIn } from 'lodash';

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

//uuid
import uuid from 'react-native-uuid';

// eslint-disable-next-line no-unused-vars
export const MainServiceRequestScreen = ({ debug, navigation, route }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const serviceTemporal = useSelector(state => state.serviceReducer.serviceTemporal);

	//State
	const [isEdit, setIsEdit] = useState(false);

	const [values, setValues] = useState({
		sdid: uuid.v4(),
		type: "",
		typeId: "",
		step1: "",
		step1id: "",
		step2: "",
		step2id: "",
		step3: "",
		step3id: "",
		inputs: {}
	})

	const resetForm = () => {
		console.log(`🕳  DETA - Dispatch Loading STOP`);
		dispatch(setLoadingMessage(false));
		setStep(0)
		setIsEdit(false)
		setListStep1([])
		setListStep2([])
		setListStep3([])
		setListInputs([])
		setValues({
			sdid: uuid.v4(),
			type: "",
			typeId: "",
			step1: "",
			step1id: "",
			step2: "",
			step2id: "",
			step3: "",
			step3id: "",
			inputs: {}
		})
		setSaved(false)
	};

	useEffect(() => {
		if (route.params?.reset) {
			route.params = {}
			resetForm();
		}
	}, [route.params?.reset]);

	//useEffect(() => {
	//	console.log('values', values)
	//}, [values]);

	function handleChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
	}
	function handleInputChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				inputs: { ...prevValues.inputs, [keyName]: value }
			}
		})
	}

	//Save service
	// eslint-disable-next-line no-unused-vars
	const [saved, setSaved, handleRemoveServiceDetail, handleSaveServiceDetail, handleSaveService] = useFirebaseSaveServiceDetail(debug)

	//Steps
	const [step, setStep] = useState(0);
	const [listStep1, setListStep1] = useState([]);
	const [listStep2, setListStep2] = useState([]);
	const [listStep3, setListStep3] = useState([]);
	const [listInputs, setListInputs] = useState([]);

	useEffect(() => {
		if (values?.type) {
			setListStep1(servicesTypes.find((type) => type.identifier === values.type).step1types)
		}
	}, [values.type]);

	useEffect(() => {
		if (values?.step1) {
			const step1item = listStep1.find((type) => type.identifier === values.step1);
			if (step1item?.inputs) {
				setListInputs(step1item.inputs)
			} else {
				setListStep2(step1item.step2types)
			}
		}
	}, [values.step1]);

	useEffect(() => {
		if (values?.step2) {
			const step2item = listStep2.find((type) => type.identifier === values.step2);
			if (step2item?.inputs) {
				setListInputs(step2item.inputs)
			} else {
				setListStep3(step2item.step3types)
			}
		}
	}, [values.step2]);

	useEffect(() => {
		if (values?.step3) {
			const step3item = listStep3.find((type) => type.identifier === values.step3);
			setListInputs(step3item.inputs)
		}
	}, [values.step3]);

	useEffect(() => {
		console.log(`🕳  MSRQ - Dispatch Loading STOP`)
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);


	const fadeRef = useRef(new Animated.Value(0)).current

	const FadeView = (props) => {

		useEffect(() => {
			Animated.timing(
				props.fadeRef,
				{
					toValue: 1,
					duration: 500,
					useNativeDriver: Platform.OS !== 'web' ? true : false
				}
			).start();
		}, [props.fadeRef])

		return (
			<Animated.View
				style={{
					...props.style,
					opacity: props.fadeRef,
				}}
			>
				{props.children}
			</Animated.View>
		);
	}

	FadeView.propTypes = {
		style: PropTypes.object,
		fadeRef: PropTypes.object.isRequired,
		children: PropTypes.any.isRequired,
	};

	const renderCaption = (caption) => {
		return (
			<Text style={{ ...gloStyles.inputs.captionText }}>{caption}</Text>
		)
	}

	//Navigation
	const navigateToResumeDirect = () => {
		setSaved(false)
		setAskToSave(false)
		setAskToFinalizeConfig(false)
		navigation.navigate("ResumeServiceRequestScreen");
	};

	const [askToSave, setAskToSave] = useState(false);
	const [askToFinalizeConfig, setAskToFinalizeConfig] = useState(false);
	const navigateToResumeSavePrev = () => {
		const areInputsEmpty = Object.keys(values.inputs).length === 0
		if (saved || step === 0) {
			navigation.navigate("ResumeServiceRequestScreen");
		} else {
			if (areInputsEmpty) {
				setAskToFinalizeConfig(true)
			} else {
				setAskToSave(true)
			}
		}
	};

	const [savedFromModal, setSavedFromModal] = useState(false);
	const saveFromModal = () => {
		setSavedFromModal(true);
		handleSaveServiceDetail(values, isEdit)
		navigation.navigate("ResumeServiceRequestScreen");
	};

	useEffect(() => {
		if (savedFromModal) {
			setSaved(false)
			setAskToSave(false)
			navigation.navigate("ResumeServiceRequestScreen");
		}
	}, [saved]);


	const isDisabled = () => {
		let inputValuesArray = [];
		forIn(values?.inputs, (value) => {
			inputValuesArray.push(value)
		})
		return inputValuesArray?.every(isEmpty)
	}

	const isEmpty = (currentValue) => currentValue === '';

	const [servicesToList, setServicesToList] = useState([]);
	const [keyName, setKeyName] = useState('id');
	const [identifierName, setIdentifierName] = useState('type');
	const [idName, setIdName] = useState('typeId');
	useEffect(() => {
		switch (step) {
			case 0:
			default:
				setServicesToList(servicesTypes)
				setKeyName('id')
				setIdentifierName('type')
				setIdName('typeId')
				break;

			case 1:
				setServicesToList(listStep1)
				setKeyName('step1typeId')
				setIdentifierName('step1')
				setIdName('step1id')
				break;

			case 2:
				setServicesToList(listStep2)
				setKeyName('step2typeId')
				setIdentifierName('step2')
				setIdName('step2id')
				break;

			case 3:
				setServicesToList(listStep3)
				setKeyName('step3typeId')
				setIdentifierName('step3')
				setIdName('step3id')
				break;

			case 4:
				setServicesToList([])
				break;
		}
	}, [step]);


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
									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 }, secondaryText: { marginTop: 10 } }} primaryText={'Solicita un nuevo servicio'} secondaryText={'Selecciona opciones hasta llegar al servicio que necesitas. Tranquilo, podrás añadir más servicios (plantas, mantenimiento, mobiliario) al terminar de configurar este.'} />

									<SeparatorTopSection />

									{/*TITULO SECCIÓN SERVICIO*/}
									<FadeView fadeRef={fadeRef} >
										<TitleSection icon={''} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 45 }, primaryText: { fontSize: Device?.isPhone ? 18 : 24, lineHeight: Device?.isPhone ? 25 : undefined, marginLeft: !Device?.isPhone && listInputs?.length > 0 ? 60 : 0 } }}
											primaryText={
												step === 1
													? servicesTypes?.find((type) => type.id === values.typeId)?.question || ''
													: step === 2
														? listStep1?.find((type) => type.step1typeId === values.step1id)?.question || ''
														: step === 3
															? listStep2?.find((type) => type.step2typeId === values.step2id)?.question || ''
															: step === 4
																? listStep3?.find((type) => type.step3typeId === values.step3id)?.question || ''
																: '¿Qué necesitas?'
											} secondaryText={''} />
									</FadeView>

									{/*LISTADO DE OPCIONES*/}
									<FadeView style={{ ...ownStyles.servicesList }} fadeRef={fadeRef}>
										{servicesToList?.map(service => {
											return (<Button
												appearance='outline'
												style={{ ...ownStyles.btnServiceRequest }}
												key={service[keyName]}
												onPress={() => {
													Animated.timing(
														fadeRef,
														{
															toValue: 0,
															duration: 500,
															useNativeDriver: Platform.OS !== 'web' ? true : false
														}
													).start(() => {
														handleChange(service.identifier, identifierName)
														handleChange(service[keyName], idName)
														setStep(step + 1)
													}
													);
												}}
											>
												{evaProps =>
													<View style={{ ...ownStyles.btnOptionsWrapper }}>
														<Text {...evaProps} category='h6' style={{ ...ownStyles.btnServiceText }}>
															{service.label}
														</Text>
														{service?.subLabel !== '' && (
															<Text {...evaProps} category='p1' style={{ ...ownStyles.btnServiceSubText }}>
																{service.subLabel}
															</Text>
														)}
													</View>
												}
											</Button>)
										})}
									</FadeView>

									{/*LISTADO DE INPUTS*/}
									<View style={{ width: '100%' }}>
										{listInputs?.length > 0 && (
											<View style={{ width: '100%' }}>
												<View style={{ ...ownStyles.inputsRow }}>
													{listInputs?.map(input => {
														return (
															<Input
																key={input.inputId}
																style={{ ...gloStyles?.inputs?.input, ...ownStyles.input }}
																label={input.label}
																caption={renderCaption(input.caption)}
																placeholder={input.placeholder}
																value={values.inputs[input?.identifier] || ''}
																onChangeText={text => handleInputChange(text, input.identifier)}
																multiline={input.type === 'textarea'}
																textStyle={input.type === 'textarea' && { minHeight: Device?.isPhone ? 144 : 72 }}
															/>
														)
													})}
												</View>

												<View style={{ ...ownStyles.inputsRow }}>
													<Button style={{ ...gloStyles?.button, ...ownStyles.btnAddService }} onPress={() => handleSaveServiceDetail(values, isEdit)} disabled={isDisabled()}>Añadir servicio</Button>
												</View>
											</View>
										)}
									</View>

									{/*BOTTOM BUTTONS*/}
									<FadeView fadeRef={fadeRef} style={
										listInputs?.length === 0
											? { ...ownStyles.btnRow }
											: { ...ownStyles.btnRow, ...ownStyles.btnRowFull }
									}>
										{/*BOTÓN VER RESUMEN DEL PEDIDO*/}
										{serviceTemporal?.details?.length > 0 && (
											<View fadeRef={fadeRef} style={
												listInputs?.length === 0
													? { ...ownStyles.btnServiceResume }
													: { ...ownStyles.btnServiceResume, ...ownStyles.btnServiceResumeFull }
											}>
												<Button style={{ ...gloStyles?.btnWrapper }} onPress={navigateToResumeSavePrev}>
													{evaProps =>
														<View style={{ ...ownStyles.btnIconWrapper }}>
															<Icon
																name='layers'
																fill={ownStyles.layers.fill}
																width={ownStyles.layers.width}
																height={ownStyles.layers.height}
															/>
															<View style={{ ...ownStyles.btnWrapperWithIcon }}>
																<Text {...evaProps} category='h6' style={{ ...ownStyles.btnServiceTextLight }}>
																	{Device?.isPhone ? 'Ver resumen del servicio' : 'Ver resumen'}

																</Text>
																{serviceTemporal?.details?.length > 0 && (
																	<Text {...evaProps} category='p1' style={{ ...ownStyles.btnServiceSubTextLight }}>
																		{serviceTemporal?.details?.length} {serviceTemporal?.details?.length === 1 ? 'detalle añadido' : 'detalles añadidos'} hasta ahora
																	</Text>
																)}
															</View>
														</View>
													}
												</Button>
											</View>
										)}

										{/*BOTÓN ATRÁS*/}
										{step > 0
											? (
												<View fadeRef={fadeRef} style={
													listInputs?.length === 0
														? { ...ownStyles.btnServiceAtras }
														: { ...ownStyles.btnServiceAtras, ...ownStyles.btnServiceAtrasFull }
												}>
													<Button
														appearance='ghost'

														key={'back'}
														onPress={() => {
															Animated.timing(
																fadeRef,
																{
																	toValue: 0,
																	duration: 500,
																	useNativeDriver: Platform.OS !== 'web' ? true : false
																}
															).start(() => {
																switch (step) {
																	case 1:
																		handleChange("", "type")
																		handleChange("", "typeId")
																		setListStep1([])
																		handleChange({}, "inputs")
																		setListInputs([])
																		setStep(0)
																		break;
																	case 2:
																		handleChange("", "step1")
																		handleChange("", "step1id")
																		setListStep2([])
																		handleChange({}, "inputs")
																		setListInputs([])
																		setStep(1)
																		break;
																	case 3:
																		handleChange("", "step2")
																		handleChange("", "step2id")
																		setListStep3([])
																		handleChange({}, "inputs")
																		setListInputs([])
																		setStep(2)
																		break;
																	case 4:
																		handleChange("", "step3")
																		handleChange("", "step3id")
																		handleChange({}, "inputs")
																		setListInputs([])
																		setStep(3)
																		break;

																	default:
																		handleChange("", "type")
																		handleChange("", "typeId")
																		setListStep1([])
																		handleChange("", "step1")
																		handleChange("", "step1id")
																		setListStep2([])
																		handleChange("", "step2")
																		handleChange("", "step2id")
																		setListStep3([])
																		handleChange("", "step3")
																		handleChange("", "step3id")
																		handleChange({}, "inputs")
																		setListInputs([])
																		setStep(0)
																		break;
																}
															}
															);
														}}
													>
														{evaProps => <Text {...evaProps} category='h6' style={{ ...ownStyles.btnServiceText }}>
															Volver atrás
														</Text>}
													</Button>
												</View>
											)
											: (
												<View style={{ ...ownStyles.btnServiceAtras }}>
												</View>
											)}
									</FadeView>

									{/*MODAL GUARDAR DETALLE SIN GUARDAR*/}
									<ModalOptions mainText={'¿Quieres guardar el detalle del servicio que estás configurado?'} show={askToSave} setShow={setAskToSave} option1text={'Guardar y ver resumen del servicio'} option1onPress={saveFromModal} option2text={'No guardar, ver resumen del servicio'} option2onPress={navigateToResumeDirect} />

									{/*MODAL GUARDAR DETALLE A MITAD CONFIGURAR*/}
									<ModalOptions mainText={'¿Quieres terminar de configurar este servicio?'} show={askToFinalizeConfig} setShow={setAskToFinalizeConfig} option1text={'Sí, terminar de configurarlo'} option1onPress={() => setAskToFinalizeConfig(false)} option2text={'No, ver resumen del servicio'} option2onPress={navigateToResumeDirect} />

									{/*MODAL DETALLE GUARDADO*/}
									<ModalOptions mainText={'Guardado!'} show={saved} setShow={setSaved} option1text={'Añadir otro detalle al servicio'} option1onPress={resetForm} option2text={'Ver resumen del servicio'} option2onPress={navigateToResumeDirect} />

								</View>
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

MainServiceRequestScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

MainServiceRequestScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
