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
import { DateSelected } from './components/DateSelected'
import { DetailsEstimated } from './components/DetailsEstimated'
import { EstimatedTotal } from './components/EstimatedTotal'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

//Icons
import { CheckmarkCircleIcon } from '../../../assets/icons/CheckmarkCircle'

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

// eslint-disable-next-line no-unused-vars
export const EstimateResumeScreen = ({ debug, navigation, route }) => {

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
	const { saved, handleConfirmServiceEstimation } = useFirebaseServiceUtils(debug)

	useEffect(() => {
		if (saved) {
			navigation.navigate("Services", {
				screen: 'ServiceListScreen',
				params: { type: 'received' },
			});
		}
	}, [saved]);

	//Navigation
	const confirmEstimation = () => {
		if (companyHasEstimationConfirmed) {
			return
		}
		handleConfirmServiceEstimation(sid, user?.metadata?.cid, companyEstimationTotalPrice);
	};

	//Datos de la empresa dentro del servicio
	const [companyEstimations, setCompanyEstimations] = useState(undefined);
	const [companyHasEstimationConfirmed, setCompanyHasEstimationConfirmed] = useState(false);
	const [companyHasAllEstimated, setCompanyHasAllEstimated] = useState(undefined);
	const [companyHasSelectedDate, setCompanyHasSelectedDate] = useState(undefined);
	const [companyEstimationTotalPrice, setCompanyEstimationTotalPrice] = useState(0);

	useEffect(() => {
		if (service) {
			const company = service?.companies?.find(co => co.cid === user?.metadata?.cid)
			const detailsCount = service?.details?.length || 0;
			const detailsEstimatedCount = company?.estimation ? company?.estimation?.length : 0;
			const totalEstimated = company?.estimation?.reduce((acc, cE) => cE.price + acc, 0)
			setCompanyEstimations(company?.estimation || false)
			setCompanyHasEstimationConfirmed(company?.isEstimated || false)
			setCompanyHasAllEstimated(detailsCount === detailsEstimatedCount)
			setCompanyHasSelectedDate(company?.selectedDate || false)
			setCompanyEstimationTotalPrice(totalEstimated || false)
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

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Resumen del presupuesto'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{!Device.isPhone && <EstimatedTotal companyEstimationTotalPrice={companyEstimationTotalPrice || 0} />}

										{/*BOTÓN GUARDAR PRESUPUESTO*/}
										{!Device.isPhone && <BtnPrimary size={'medium'} icon={CheckmarkCircleIcon} text={companyHasEstimationConfirmed ? 'Presupesto enviado al cliente' : "Confirmar presupuesto"} onPress={confirmEstimation}
											disabled={!companyHasAllEstimated}
											status={'primary'} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>

								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{/*BOTÓN GUARDAR PRESUPUESTO*/}
									{Device.isPhone && <BtnPrimary size={'medium'} icon={CheckmarkCircleIcon} text={companyHasEstimationConfirmed ? 'Presupesto enviado al cliente' : "Confirmar presupuesto"} onPress={confirmEstimation}
										disabled={!companyHasAllEstimated}
										status={'primary'} btnStyle={{ marginBottom: 30 }} />}

									{/*SECCIÓN HORARIOS*/}
									<DateSelected dates={service?.dates || []} companyHasSelectedDate={companyHasSelectedDate || ''} cid={user?.metadata?.cid} sid={sid} />

									{/*SECCIÓN SERVICIOS*/}
									<DetailsEstimated details={service?.details || []} cid={user?.metadata?.cid} sid={sid} companyEstimations={companyEstimations || []} />

									{Device.isPhone && <EstimatedTotal companyEstimationTotalPrice={companyEstimationTotalPrice || 0} />}

									{/*BOTÓN GUARDAR PRESUPUESTO*/}
									{Device.isPhone && <BtnPrimary size={'medium'} icon={CheckmarkCircleIcon} text={companyHasEstimationConfirmed ? 'Presupesto enviado al cliente' : "Confirmar presupuesto"} onPress={confirmEstimation}
										disabled={!companyHasAllEstimated}
										status={'primary'} btnStyle={{ marginBottom: 0 }} />}

									<NavigationBackButton show={Device.isPhone} />
								</View>
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
