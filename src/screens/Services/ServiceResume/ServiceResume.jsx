/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
//import consola from '../../../libs/myLogger';
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Hooks
import { useFirebaseServiceUtils } from "../../../hooks/useFirebaseServiceUtils"

//Store
import { useSelector } from 'react-redux'

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
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

//Icons
import { CloseIcon } from '../../../assets/icons/Close'
import { CropIcon } from '../../../assets/icons/Crop'
import { PersonIcon } from '../../../assets/icons/Person'

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

	//Store
	const user = useSelector(state => state.userReducer.user);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleCancelService } = useFirebaseServiceUtils(debug)

	useEffect(() => {
		if (saved) {
			//navigation.push("ScheduleRequestScreen", { sid })
		}
	}, [saved]);


	//CANCEL
	const [sidToCancel, setSidToCancel] = useState(undefined);
	const [showCancelConfirm, setShowCancelConfirm] = useState(false);

	function cancelService() {
		handleCancelService(sidToCancel)
		setShowCancelConfirm(false)
	}

	//Navigation
	const navigateToEstimate = () => {
		navigation.navigate("Services", {
			screen: 'EstimateServiceScreen',
			params: { sid },
		});
	};
	const navigateToResume = () => {
		navigation.navigate("Services", {
			screen: 'EstimateResumeScreen',
			params: { sid },
		});
	};
	const navigateToWorkerAssign = () => {
		navigation.navigate("Services", {
			screen: 'WorkerAssignServiceScreen',
			params: { sid, cid: companyCid },
		});
	};

	function hideModal() {
		setSidToCancel(undefined)
		setShowCancelConfirm(false)
	}

	//Datos de la empresa dentro del servicio
	const [serviceIsConfirmed, setServiceIsConfirmed] = useState(false);
	const [serviceIsFinalized, setServiceIsFinalized] = useState(false);
	const [serviceIsCanceled, setServiceIsCanceled] = useState(false);
	const [serviceHasSomeEstimations, setServiceHasSomeEstimations] = useState(false);
	const [serviceHasAllEstimations, setServiceHasAllEstimations] = useState(false);
	const [serviceHasWorkerAsigned, setServiceHasWorkerAsigned] = useState(false);

	const [companyHasEstimationConfirmed, setCompanyHasEstimationConfirmed] = useState(false);
	const [companyEstimationConfirmedDate, setCompanyEstimationConfirmedDate] = useState(false);
	const [companyHasEstimationAccepted, setCompanyHasEstimationAccepted] = useState(false);
	const [companyEstimationAcceptedDate, setCompanyEstimationAcceptedDate] = useState(false);
	const [companyHasEstimationRefused, setCompanyHasEstimationRefused] = useState(false);
	const [companyEstimationRefusedDate, setCompanyEstimationRefusedDate] = useState(false);
	const [companyCid, setCompanyCid] = useState(false);

	useEffect(() => {
		if (service) {
			setServiceIsConfirmed(service?.isConfirmed || false)
			setServiceIsFinalized(service?.isFinalized || false)
			setServiceIsCanceled(service.cancelationDate !== null || false)
			setServiceHasSomeEstimations(service?.companies?.some((co) => co?.isEstimated) || false)
			setServiceHasAllEstimations(service?.companies?.every((co) => co?.isEstimated) || false)
			setServiceHasWorkerAsigned(service?.asignedWorker || false)

			const company = service?.companies?.find(co => co.cid === user?.metadata?.cid)
			setCompanyHasEstimationConfirmed(company?.isEstimated || false)
			setCompanyEstimationConfirmedDate(company?.estimationDate || '')
			setCompanyHasEstimationAccepted(company?.isSelected || false)
			setCompanyEstimationAcceptedDate(company?.isSelectedDate || '')
			setCompanyHasEstimationRefused(company?.isRefused || false)
			setCompanyEstimationRefusedDate(company?.isRefusedDate || '')
			setCompanyCid(company?.cid || '')
		}
	}, [service]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<NavigationTop />
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen hasTopNavigation={true} />
							<View style={{ ...gloStyles.view }}>

								<View style={{ ...gloStyles.section.primary }}>

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Resumen del servicio'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{/*BOTÓN PRESUPUESTAR*/}
										{(user?.role === 'business' && !Device.isPhone && !companyHasEstimationConfirmed) && <BtnPrimary size={'medium'} icon={CropIcon} text={"Presupuestar"} onPress={navigateToEstimate} disabled={serviceIsCanceled} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

										{/*BOTÓN ASIGNAR*/}
										{(user?.role === 'business' && !Device.isPhone && companyHasEstimationConfirmed) && <BtnPrimary size={'medium'} icon={PersonIcon} text={serviceHasWorkerAsigned ? 'Cambiar empleado asignado' : "Asignar a empleado"} onPress={navigateToWorkerAssign} disabled={serviceIsCanceled} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

										{/*BOTÓN CANCELAR SERVICIO*/}
										{(user?.role === 'client' && !Device.isPhone) && <BtnPrimary size={'medium'} icon={CloseIcon} text={"Cancelar servicio"} onPress={() => { setSidToCancel(sid); setShowCancelConfirm(true) }} disabled={serviceIsCanceled} status={'danger'} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>
								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{/*BOTÓN PRESUPUESTAR*/}
									{(user?.role === 'business' && Device.isPhone && !companyHasEstimationConfirmed) && <BtnPrimary size={'medium'} icon={CropIcon} text={"Presupuestar"} onPress={navigateToEstimate} disabled={serviceIsCanceled} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

									{/*BOTÓN ASIGNAR*/}
									{(user?.role === 'business' && Device.isPhone && companyHasEstimationConfirmed) && <BtnPrimary size={'medium'} icon={PersonIcon} text={serviceHasWorkerAsigned ? 'Cambiar empleado asignado' : "Asignar a empleado"} onPress={navigateToWorkerAssign} disabled={serviceIsCanceled} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

									{/*SECCIÓN INFORMACIÓN BÁSICA*/}
									<BasicDetails
										isConfirmed={serviceIsConfirmed}
										isFinalized={serviceIsFinalized}
										isCanceled={serviceIsCanceled}
										isSomeEstimated={serviceHasSomeEstimations}
										isAllEstimated={serviceHasAllEstimations}
										companyHasEstimationConfirmed={companyHasEstimationConfirmed}
										companyEstimationConfirmedDate={companyEstimationConfirmedDate}
										companyHasEstimationAccepted={companyHasEstimationAccepted}
										companyEstimationAcceptedDate={companyEstimationAcceptedDate}
										companyHasEstimationRefused={companyHasEstimationRefused}
										companyEstimationRefusedDate={companyEstimationRefusedDate}
										requestDate={service?.requestDate}
										cancelationDate={service?.cancelationDate}
										confirmationDate={service?.confirmationDate}
										previousVisitDate={service?.previousVisitDate}
										serviceDate={service?.serviceDate}
										goToResume={navigateToResume}
									/>

									{/*SECCIÓN EMPRESAS*/}
									<CompaniesList companies={service?.companies || []} sid={sid} />

									{/*SECCIÓN HORARIOS*/}
									<DatesList dates={service?.dates || []} dateSelected={service?.serviceDid || ''} isConfirmed={service?.isConfirmed || false} />

									{/*SECCIÓN SERVICIOS*/}
									<DetailsList details={service?.details || []} />

									{/*BOTÓN CANCELAR SERVICIO*/}
									{(user?.role === 'client' && Device.isPhone) && <BtnPrimary size={'medium'} icon={CloseIcon} text={"Cancelar servicio"} onPress={() => { setSidToCancel(sid); setShowCancelConfirm(true) }} disabled={serviceIsCanceled} status={'danger'} btnStyle={{ marginBottom: 30, marginTop: 0 }} />}

									<NavigationBackButton show={Device.isPhone} btnStyle={{ marginTop: 0 }} />
								</View>

								{/*MODAL ELIMINAR DETALLE*/}
								<ModalOptions mainText={'¿Seguro que quieres cancelar este servicio?'} show={showCancelConfirm} setShow={setShowCancelConfirm} option1text={'Sí, cancelar'} option1onPress={cancelService} option1status={'danger'} option2text={'No, mantener'} option2onPress={hideModal} />

							</View>
						</Layout>
					</ScrollView>
					<StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#31a060' translucent={false} />
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
