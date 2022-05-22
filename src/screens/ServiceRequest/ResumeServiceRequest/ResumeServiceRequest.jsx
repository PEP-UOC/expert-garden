import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Store
import { useSelector } from 'react-redux'

//Hooks
import { useFirebaseServiceUtils } from "../../../hooks/useFirebaseServiceUtils"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { BtnSecondary } from '../../../components/Buttons/Secondary'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { DetailsList } from './components/DetailsList'

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

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleRemoveServiceDetail, handleSaveService } = useFirebaseServiceUtils(debug)

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
									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 }, secondaryText: { marginTop: 10 } }} primaryText={'Resumen del nuevo servicio'} secondaryText={'Revisa los detalles del servicio a solicitar. En el siguiente paso podrás seleccionar los horarios que mejor te vengan y las empresas que más te gusten.'} />

									<SeparatorTopSection />
									<View style={{ ...gloStyles.view }}>
										<View style={{ ...gloStyles.section.primary }}>

											<View style={{ paddingLeft: 45 }}>
												{/*BOTÓN AÑADIR OTRO DETALLE AL SERVICIO*/}
												{!Device.isPhone && <BtnSecondary size={'medium'} icon={AddIcon} text={"Añadir otro detalle al servicio"} onPress={() => navigation.navigate("MainServiceRequestScreen", { reset: true })} btnStyle={{ marginBottom: 30 }} />}

												{/*BOTÓN SOLICITAR SERVICIO*/}
												{!Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar detalles"} onPress={() => handleSaveService(serviceTemporal, isEdit)} btnStyle={{ marginBottom: 30 }} />}
											</View>

										</View>

										<View style={{ ...gloStyles.section.secondary }}>

											{/*SECCIÓN SERVICIOS*/}
											<View>
												<DetailsList setSdidToRemove={setSdidToRemove} setShowDeleteConfirm={setShowDeleteConfirm} />
											</View>

											{/*BOTÓN AÑADIR OTRO DETALLE AL SERVICIO*/}
											{Device.isPhone && <BtnSecondary size={'medium'} icon={AddIcon} text={"Añadir otro detalle al servicio"} onPress={() => navigation.navigate("MainServiceRequestScreen", { reset: true })} btnStyle={{ marginBottom: 10, marginTop: 0 }} />}

											{/*BOTÓN SOLICITAR SERVICIO*/}
											{Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar detalles"} onPress={() => handleSaveService(serviceTemporal, isEdit)} btnStyle={{ marginBottom: 10, marginTop: 10 }} />}

										</View>
									</View>

									{/*MODAL ELIMINAR DETALLE*/}
									<ModalOptions mainText={'¿Seguro que quieres eliminar este detalle?'} show={showDeleteConfirm} setShow={setShowDeleteConfirm} option1text={'Sí, eliminar'} option1onPress={removeDetail} option2text={'No, mantener'} option2onPress={hideModal} />

								</View>
							</View>
						</Layout>
					</ScrollView>
					<StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#31a060' translucent={false} />
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
