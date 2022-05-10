import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

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
import { useFirebaseSaveService } from "../../../hooks/useFirebaseSaveService"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { DetailsList } from './components/DetailsList'

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { TruckIcon } from '../../../assets/icons/Truck'

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

// eslint-disable-next-line no-unused-vars
export const ServiceResumeScreen = ({ debug, navigation, route }) => {

	const sid = route.params.sid;
	console.log('sid', sid)

	//Hooks
	const { loading: serviceLoading, result: service, error: serviceError } = useFirebaseGetOne(debug, 'services', 'sid', sid);
	console.log('service', service)

	//State
	// eslint-disable-next-line no-unused-vars
	const [isEdit, setIsEdit] = useState(false);

	const [values, setValues] = useState(service)

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const [saved, setSaved, handleRemoveServiceDetail, handleSaveServiceDetail, handleSaveService] = useFirebaseSaveService(debug)

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
									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 0 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 }, secondaryText: { marginTop: 10 } }} primaryText={'Resumen del servicio'} secondaryText={''} />

									<SeparatorTopSection />
									<View style={{ ...gloStyles.view }}>
										<View style={{ ...gloStyles.section.primary }}>

											<View style={{ paddingLeft: 60 }}>
												{/*BOTÓN CANCELAR SERVICIO*/}
												{Platform.OS === "web" && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Seleccionar horario"} onPress={() => handleSaveService(values, isEdit)} />}
											</View>

										</View>

										<View style={{ ...gloStyles.section.secondary }}>

											{/*SECCIÓN SERVICIOS*/}
											<View>
												<DetailsList details={service?.details || []} />
											</View>

											{/*BOTÓN CANCELAR SERVICIO*/}
											{Platform.OS !== "web" && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Seleccionar horario"} onPress={() => handleSaveService(values, isEdit)} />}

										</View>
									</View>

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

ServiceResumeScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

ServiceResumeScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
