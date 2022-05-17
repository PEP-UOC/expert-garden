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

//Icons
import { CloseIcon } from '../../../assets/icons/Close'
import { CropIcon } from '../../../assets/icons/Crop'

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

	const [companyHasEstimationConfirmed, setCompanyHasEstimationConfirmed] = useState(false);
	const [companyEstimationConfirmedDate, setCompanyEstimationConfirmedDate] = useState(false);
	const [companyHasEstimationAccepted, setCompanyHasEstimationAccepted] = useState(false);
	const [companyEstimationAcceptedDate, setCompanyEstimationAcceptedDate] = useState(false);
	const [companyHasEstimationRefused, setCompanyHasEstimationRefused] = useState(false);
	const [companyEstimationRefusedDate, setCompanyEstimationRefusedDate] = useState(false);

	useEffect(() => {
		//console.log('service', service)
		if (service) {
			setServiceIsConfirmed(service?.isConfirmed || false)
			setServiceIsFinalized(service?.isFinalized || false)
			setServiceIsCanceled(service.cancelationDate !== null || false)
			setServiceHasSomeEstimations(service?.companies?.some((co) => co?.isEstimated) || false)
			setServiceHasAllEstimations(service?.companies?.every((co) => co?.isEstimated) || false)

			const company = service?.companies?.find(co => co.cid === user?.metadata?.cid)
			//console.log('company', company)
			setCompanyHasEstimationConfirmed(company?.isEstimated || false)
			setCompanyEstimationConfirmedDate(company?.estimationDate || '')
			setCompanyHasEstimationAccepted(company?.isSelected || false)
			setCompanyEstimationAcceptedDate(company?.isSelectedDate || '')
			setCompanyHasEstimationRefused(company?.isRefused || false)
			setCompanyEstimationRefusedDate(company?.isRefusedDate || '')
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
							<View style={{ ...gloStyles.view }}>

								<View style={{ ...gloStyles.section.primary }}>

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Resumen del servicio'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{/*BOTÓN PRESUPUESTAR*/}
										{(user?.role === 'business' && !Device.isPhone && !companyHasEstimationConfirmed) && <BtnPrimary size={'medium'} icon={CropIcon} text={"Presupuestar"} onPress={navigateToEstimate} disabled={serviceIsCanceled} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

										{/*BOTÓN CANCELAR SERVICIO*/}
										{(user?.role === 'client' && !Device.isPhone) && <BtnPrimary size={'medium'} icon={CloseIcon} text={"Cancelar servicio"} onPress={() => { setSidToCancel(sid); setShowCancelConfirm(true) }} disabled={serviceIsCanceled} status={'danger'} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>
								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{/*BOTÓN PRESUPUESTAR*/}
									{(user?.role === 'business' && Device.isPhone && !companyHasEstimationConfirmed) && <BtnPrimary size={'medium'} icon={CropIcon} text={"Presupuestar"} onPress={navigateToEstimate} disabled={serviceIsCanceled} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

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
