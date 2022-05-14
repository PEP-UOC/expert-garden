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

//Hooks
import { useFirebaseSaveService } from "../../../hooks/useFirebaseSaveService"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { BasicDetails } from './components/BasicDetails'
import { CompaniesList } from './components/CompaniesList'
import { DatesList } from './components/DatesList'
import { DetailsList } from './components/DetailsList'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

//Icons
import { TruckIcon } from '../../../assets/icons/Truck'
import { CloseIcon } from '../../../assets/icons/Close'

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

// eslint-disable-next-line no-unused-vars
export const ServiceResumeScreen = ({ debug, navigation, route }) => {

	const sid = route.params.sid;

	//Hooks
	// eslint-disable-next-line no-unused-vars
	const { loading: serviceLoading, result: service, error: serviceError } = useFirebaseGetOne(debug, 'services', 'sid', sid);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const [saved, setSaved, handleRemoveServiceDetail, handleSaveServiceDetail, handleSaveService, handleCancelService] = useFirebaseSaveService(debug)

	useEffect(() => {
		if (saved) {
			//navigation.push("ScheduleRequestScreen", { sid })
		}
	}, [saved]);


	const [sidToCancel, setSidToCancel] = useState(undefined);
	const [showCancelConfirm, setShowCancelConfirm] = useState(false);

	const isCancelDisabled = () => {
		return service.cancelationDate !== null
	}

	function cancelService() {
		handleCancelService(sidToCancel)
		setShowCancelConfirm(false)
	}

	function hideModal() {
		setSidToCancel(undefined)
		setShowCancelConfirm(false)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop />
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<View style={{ ...gloStyles.view }}>

								<View style={{ ...gloStyles.section.primary }}>

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Resumen del servicio'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{/*BOTÓN CANCELAR SERVICIO*/}
										{!Device.isPhone && <BtnPrimary size={'medium'} icon={CloseIcon} text={"Cancelar servicio"} onPress={() => { setSidToCancel(sid); setShowCancelConfirm(true) }} disabled={isCancelDisabled()} status={'danger'} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>

								</View>

								<View style={{ ...gloStyles.section.secondary }}>
									{/*SECCIÓN INFORMACIÓN BÁSICA*/}
									<BasicDetails
										hasBudgets={service?.companies?.some((company) => company?.budget || false)}
										isFinalized={service?.isFinalized}
										isCanceled={isCancelDisabled()}
										requestDate={service?.requestDate}
										cancelationDate={service?.cancelationDate}
										confirmationDate={service?.confirmationDate}
										previousVisitDate={service?.previousVisitDate}
										serviceDate={service?.serviceDate}
									/>

									{/*SECCIÓN EMPRESAS*/}
									<CompaniesList companies={service?.companies || []} />

									{/*SECCIÓN HORARIOS*/}
									<DatesList dates={service?.dates || []} />

									{/*SECCIÓN SERVICIOS*/}
									<DetailsList details={service?.details || []} />

									{/*BOTÓN CANCELAR SERVICIO*/}
									{Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Cancelar servicio"} onPress={() => { setSidToCancel(sid); setShowCancelConfirm(true) }} disabled={isCancelDisabled()} status={'danger'} btnStyle={{ marginBottom: 0, marginTop: 0 }} />}

									<NavigationBackButton show={Device.isPhone} />
								</View>

								{/*MODAL ELIMINAR DETALLE*/}
								<ModalOptions mainText={'¿Seguro que quieres cancelar este servicio?'} show={showCancelConfirm} setShow={setShowCancelConfirm} option1text={'Sí, cancelar'} option1onPress={cancelService} option1status={'danger'} option2text={'No, mantener'} option2onPress={hideModal} />

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
