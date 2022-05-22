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
import { DatesSelect } from './components/DatesSelect'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { DetailsEstimate } from './components/DetailsEstimate'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'

//Icons
import { CropIcon } from '../../../assets/icons/Crop'

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

// eslint-disable-next-line no-unused-vars
export const EstimateServiceScreen = ({ debug, navigation, route }) => {

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

	//Navigation
	const navigateToEstimateResume = () => {
		navigation.navigate("Services", {
			screen: 'EstimateResumeScreen',
			params: { sid },
		});
	};

	//Datos de la empresa dentro del servicio
	const [companyEstimations, setCompanyEstimations] = useState(undefined);
	const [companyHasEstimated, setCompanyHasEstimated] = useState(undefined);
	const [companyHasAllEstimated, setCompanyHasAllEstimated] = useState(undefined);
	const [companyHasSelectedDate, setCompanyHasSelectedDate] = useState(undefined);

	useEffect(() => {
		if (service) {
			const company = service?.companies?.find(co => co.cid === user?.metadata?.cid)
			const detailsCount = service?.details?.length || 0;
			const detailsEstimatedCount = company?.estimation ? company?.estimation?.length : 0;
			setCompanyEstimations(company?.estimation || false)
			setCompanyHasEstimated(company?.isEstimated || false)
			setCompanyHasAllEstimated(detailsCount === detailsEstimatedCount)
			setCompanyHasSelectedDate(company?.selectedDate || false)
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

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Presupuesto'} secondaryText={'Cuando hayas seleccionado la fecha que mejor te venga y hayas indicado el precio de todos los detalles del servicio, guarda el presupuesto.'} />

									<View style={{ paddingLeft: 45 }}>

										{/*BOTÓN GUARDAR PRESUPUESTO*/}
										{!Device.isPhone && !companyHasEstimated && <BtnPrimary size={'medium'} icon={CropIcon} text={"Guardar presupuesto"} onPress={navigateToEstimateResume}
											disabled={!companyHasAllEstimated}
											status={'primary'} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>

								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{/*BOTÓN GUARDAR PRESUPUESTO*/}
									{Device.isPhone && !companyHasEstimated && <BtnPrimary size={'medium'} icon={CropIcon} text={"Guardar presupuesto"} onPress={navigateToEstimateResume}
										disabled={!companyHasAllEstimated}
										status={'primary'} btnStyle={{ marginBottom: 30 }} />}

									{/*SECCIÓN HORARIOS*/}
									<DatesSelect dates={service?.dates || []} companyHasSelectedDate={companyHasSelectedDate || ''} cid={user?.metadata?.cid} sid={sid} />

									{/*SECCIÓN SERVICIOS*/}
									<DetailsEstimate details={service?.details || []} cid={user?.metadata?.cid} sid={sid} companyEstimations={companyEstimations || []} />

									{/*BOTÓN GUARDAR PRESUPUESTO*/}
									{Device.isPhone && !companyHasEstimated && <BtnPrimary size={'medium'} icon={CropIcon} text={"Guardar presupuesto"} onPress={navigateToEstimateResume}
										disabled={!companyHasAllEstimated}
										status={'primary'} btnStyle={{ marginBottom: 0 }} />}

									<NavigationBackButton show={Device.isPhone} />
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

EstimateServiceScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

EstimateServiceScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
