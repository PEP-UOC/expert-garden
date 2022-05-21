import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
//import consola from '../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Hooks
import { useFirebaseServiceUtils } from "../../../hooks/useFirebaseServiceUtils"

//Store
import { useSelector } from 'react-redux'

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { DateSelected } from './components/DateSelected'
import { DetailsEstimated } from './components/DetailsEstimated'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { EstimatedTotal } from './components/EstimatedTotal'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

//Icons
import { CheckmarkCircleIcon } from '../../../assets/icons/CheckmarkCircle'
import { CloseCircleIcon } from '../../../assets/icons/CloseCircle'

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

// eslint-disable-next-line no-unused-vars
export const EstimateResumeScreen = ({ debug, navigation, route }) => {

	//Store
	const user = useSelector(state => state.userReducer.user);

	const sid = route.params.sid;
	const cid = route?.params?.cid || user?.metadata?.cid;

	//Hooks
	// eslint-disable-next-line no-unused-vars
	const { loading: serviceLoading, result: service, error: serviceError } = useFirebaseGetOne(debug, 'services', 'sid', sid);

	//Styles
	const ownStyles = useStyleSheet(styles);
	const gloStyles = useStyleSheet(globalStyles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleConfirmServiceEstimation, handleAcceptServiceEstimation, handleRefuseServiceEstimation } = useFirebaseServiceUtils(debug)

	useEffect(() => {
		if (saved) {
			navigation.navigate("Services", {
				screen: 'ServiceResumeScreen',
				params: { sid },
			});
		}
	}, [saved]);

	//Navigation
	const confirmEstimation = () => {
		if (companyHasEstimationConfirmed) {
			return
		}
		handleConfirmServiceEstimation(sid, cid, companyEstimationTotalPrice);
	};

	//Datos de la empresa dentro del servicio
	const [companyEstimations, setCompanyEstimations] = useState(undefined);
	const [companyHasEstimationConfirmed, setCompanyHasEstimationConfirmed] = useState(false);
	const [companyHasEstimationAccepted, setCompanyHasEstimationAccepted] = useState(false);
	const [companyHasEstimationRefused, setCompanyHasEstimationRefused] = useState(false);
	const [companyHasAllEstimated, setCompanyHasAllEstimated] = useState(undefined);
	const [companyHasSelectedDate, setCompanyHasSelectedDate] = useState(undefined);
	const [companyEstimationTotalPrice, setCompanyEstimationTotalPrice] = useState(0);

	useEffect(() => {
		if (service) {
			const company = service?.companies?.find(co => co.cid === cid)
			const detailsCount = service?.details?.length || 0;
			const detailsEstimatedCount = company?.estimation ? company?.estimation?.length : 0;
			const totalEstimated = company?.estimation?.reduce((acc, cE) => cE.price + acc, 0)
			setCompanyEstimations(company?.estimation || false)
			setCompanyHasEstimationConfirmed(company?.isEstimated || false)
			setCompanyHasEstimationAccepted(company?.isSelected || false)
			setCompanyHasEstimationRefused(company?.isRefused || false)
			setCompanyHasAllEstimated(detailsCount === detailsEstimatedCount)
			setCompanyHasSelectedDate(company?.selectedDate || false)
			setCompanyEstimationTotalPrice(totalEstimated || false)
		}
	}, [service]);


	//ACCEPT
	const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);

	const isAcceptDisabled = () => {
		//return false
		return (service?.selectedCompany && service?.selectedCompany !== null) || false
	}

	const acceptEstimation = () => {
		if (isRefuseDisabled()) {
			setShowAcceptConfirm(false)
			return
		}
		handleAcceptServiceEstimation(sid, cid);
		setShowAcceptConfirm(false)
	};


	//REFUSE
	const [showRefuseConfirm, setShowRefuseConfirm] = useState(false);

	const isRefuseDisabled = () => {
		//return false
		return (service?.selectedCompany && service?.selectedCompany !== null) || false
	}

	const refuseEstimation = () => {
		if (isRefuseDisabled()) {
			setShowRefuseConfirm(false)
			return
		}
		handleRefuseServiceEstimation(sid, cid);
		setShowRefuseConfirm(false)
	};

	function hideModal() {
		setShowAcceptConfirm(false)
		setShowRefuseConfirm(false)
	}

	const isCompanySelectedOrRejected = () => {
		//return false
		return service?.companies?.find(co => co.cid === cid)?.isSelected || service?.companies?.find(co => co.cid === cid)?.isRefused
	}

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

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Resumen del presupuesto'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{!Device.isPhone && <EstimatedTotal companyEstimationTotalPrice={companyEstimationTotalPrice || 0} />}

										{{
											'client': (
												<>
													{isCompanySelectedOrRejected() ?
														<>
															{!Device.isPhone && (
																<>
																	{service?.companies?.find(co => co.cid === cid)?.isSelected ? (
																		<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 30 }}>
																			<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
																				Presupuesto aceptado
																			</Text>
																		</View>
																	) : (
																		<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 30 }}>
																			<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
																				Presupuesto rechazado
																			</Text>
																		</View>
																	)}
																</>
															)
															}
														</>
														:
														<>
															{/*BOTÓN ACEPTAR / RECHAZAR PRESUPUESTO*/}
															{!Device.isPhone && service.cancelationDate === null && <BtnPrimary size={'medium'} icon={CheckmarkCircleIcon} text={"Aceptar"} onPress={() => setShowAcceptConfirm(true)} disabled={isAcceptDisabled()} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

															{!Device.isPhone && service.cancelationDate === null && <BtnPrimary size={'medium'} icon={CloseCircleIcon} text={"Rechazar"} onPress={() => setShowRefuseConfirm(true)} disabled={isRefuseDisabled()} status={'danger'} btnStyle={{ marginBottom: 30 }} />}
														</>
													}
												</>
											),
											'business': (
												<>
													{/*BOTÓN GUARDAR PRESUPUESTO*/}
													{!Device.isPhone && <BtnPrimary size={'medium'} icon={companyHasEstimationRefused ? CloseCircleIcon : CheckmarkCircleIcon} text={companyHasEstimationConfirmed ? companyHasEstimationAccepted ? 'Presupuesto aceptado por el cliente' : companyHasEstimationRefused ? 'Presupuesto rechazado por el cliente' : 'Presupesto enviado al cliente' : "Confirmar presupuesto"} onPress={confirmEstimation}
														disabled={!companyHasAllEstimated}
														status={companyHasEstimationRefused ? 'danger' : 'primary'} btnStyle={{ marginBottom: 30 }} />}
												</>
											)
										}[user?.role]}

										<NavigationBackButton show={!Device.isPhone} />
									</View>

								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{{
										'client': (
											<>
												{isCompanySelectedOrRejected() ?
													<>
														{Device.isPhone && (
															<>
																{service?.companies?.find(co => co.cid === cid)?.isSelected ? (
																	<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 30 }}>
																		<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
																			Presupuesto aceptado
																		</Text>
																	</View>
																) : (
																	<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 30 }}>
																		<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
																			Presupuesto rechazado
																		</Text>
																	</View>
																)}
															</>
														)
														}
													</>
													:
													null
												}
											</>
										),
										'business': (
											<>
												{/*BOTÓN GUARDAR PRESUPUESTO*/}
												{Device.isPhone && <BtnPrimary size={'medium'} icon={companyHasEstimationRefused ? CloseCircleIcon : CheckmarkCircleIcon} text={companyHasEstimationConfirmed ? companyHasEstimationAccepted ? 'Presupuesto aceptado por el cliente' : companyHasEstimationRefused ? 'Presupuesto rechazado por el cliente' : 'Presupesto enviado al cliente' : "Confirmar presupuesto"} onPress={confirmEstimation}
													disabled={!companyHasAllEstimated}
													status={companyHasEstimationRefused ? 'danger' : 'primary'} btnStyle={{ marginBottom: 30 }} />}
											</>
										)
									}[user?.role]}

									{/*SECCIÓN HORARIOS*/}
									<DateSelected dates={service?.dates || []} companyHasSelectedDate={companyHasSelectedDate || ''} cid={cid} sid={sid} />

									{/*SECCIÓN SERVICIOS*/}
									<DetailsEstimated details={service?.details || []} cid={cid} sid={sid} companyEstimations={companyEstimations || []} />

									{Device.isPhone && <EstimatedTotal companyEstimationTotalPrice={companyEstimationTotalPrice || 0} />}

									{{
										'client': (
											<>
												{isCompanySelectedOrRejected() ?
													<>
														{Device.isPhone && (
															<>
																{service?.companies?.find(co => co.cid === cid)?.isSelected ? (
																	<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 0 }}>
																		<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
																			Presupuesto aceptado
																		</Text>
																	</View>
																) : (
																	<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 0 }}>
																		<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
																			Presupuesto rechazado
																		</Text>
																	</View>
																)}
															</>
														)
														}
													</>
													:
													<>
														{/*BOTÓN ACEPTAR / RECHAZAR PRESUPUESTO*/}
														{Device.isPhone && service.cancelationDate === null && <BtnPrimary size={'medium'} icon={CheckmarkCircleIcon} text={"Aceptar"} onPress={() => setShowAcceptConfirm(true)} disabled={isAcceptDisabled()} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

														{Device.isPhone && service.cancelationDate === null && <BtnPrimary size={'medium'} icon={CloseCircleIcon} text={"Rechazar"} onPress={() => setShowRefuseConfirm(true)} disabled={isRefuseDisabled()} status={'danger'} />}
													</>
												}
											</>
										),
										'business': (
											<>
												{/*BOTÓN GUARDAR PRESUPUESTO*/}
												{Device.isPhone && <BtnPrimary size={'medium'} icon={companyHasEstimationRefused ? CloseCircleIcon : CheckmarkCircleIcon} text={companyHasEstimationConfirmed ? companyHasEstimationAccepted ? 'Presupuesto aceptado por el cliente' : companyHasEstimationRefused ? 'Presupuesto rechazado por el cliente' : 'Presupesto enviado al cliente' : "Confirmar presupuesto"} onPress={confirmEstimation}
													disabled={!companyHasAllEstimated}
													status={companyHasEstimationRefused ? 'danger' : 'primary'} />}
											</>
										)
									}[user?.role]}

									<NavigationBackButton show={Device.isPhone} />
								</View>

								{/*MODAL ACEPTAR PRESUPUESTO*/}
								<ModalOptions mainText={'¿Quieres aceptar este presupuesto? El resto se rechazarán.'} show={showAcceptConfirm} setShow={setShowAcceptConfirm} option1text={'Sí, aceptar'} option1onPress={acceptEstimation} option1status={'primary'} option2text={'No, quiero revisar el resto'} option2onPress={hideModal} />

								{/*MODAL RECHAZAR PRESUPUESTO*/}
								<ModalOptions mainText={'¿Seguro que quieres rechazar este presupuesto?'} show={showRefuseConfirm} setShow={setShowRefuseConfirm} option1text={'Sí, rechazar'} option1onPress={refuseEstimation} option1status={'danger'} option2text={'No, quiero volver a revisarlo'} option2onPress={hideModal} />
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

EstimateResumeScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

EstimateResumeScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
