import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
//import styles from './styles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { addDate } from '../../../store/service/serviceAction';

//Hooks
import { useFirebaseServiceUtils } from "../../../hooks/useFirebaseServiceUtils"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { BtnSecondary } from '../../../components/Buttons/Secondary'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { DatesList } from "./components/DatesList"

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { TruckIcon } from '../../../assets/icons/Truck'

//Moment
import moment from 'moment';

//uuid
import uuid from 'react-native-uuid';

// eslint-disable-next-line no-unused-vars
export const ScheduleRequestScreen = ({ debug, navigation, route }) => {
	const dispatch = useDispatch();

	const sid = route.params.sid;

	//Store
	const user = useSelector(state => state.userReducer.user);
	const dates = useSelector(state => state.serviceReducer.serviceTemporal.dates);

	//State
	// eslint-disable-next-line no-unused-vars
	const [isEdit, setIsEdit] = useState(false);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	//const ownStyles = useStyleSheet(styles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleSaveService } = useFirebaseServiceUtils(debug)

	function addNewDate() {
		const dateBasic = {
			did: uuid.v4(),
			date: moment().add(3, 'days').format("DD/MM/YYYY"),
			dateTime: moment().add(3, 'days').format(),
			schedule: "ALL_DAY",
			extra: ""
		}
		dispatch(addDate(dateBasic));
	}

	function confirmDates() {
		handleSaveService({ sid, dates, what: 'dates' }, true)
	}

	useEffect(() => {
		if (saved) {
			navigation.push("CompanyRequestScreen", { sid })
		}
	}, [saved]);

	const isDisabled = () => {
		return dates.length === 0
	}

	useEffect(() => {
		if (dates.length === 0) {
			addNewDate()
		}
	}, []);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<ScrollView alwaysBounceVertical={true} centerContent={true}
						contentContainerStyle={{ ...gloStyles.scrollView }}>
						<Layout style={{ ...gloStyles.layout }}>
							<SeparatorTopScreen />
							<View style={{ ...gloStyles.view }}>
								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={'clock-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 } }} primaryText={'Fecha y hora'} secondaryText={'Puedes añadir tantas fechas como quieras. Cuantas más fechas tengas disponibles más fácil será para las empresas ofrecerte el servicio. Estas fechas serán utilizadas para realizar el servicio o para relizar la visita previa si es necesaria.'} />
									{
										{
											'client': (
												<View style={{ paddingLeft: 45 }}>
													{!Device.isPhone && <BtnSecondary size={'medium'} icon={AddIcon} text={"Añadir fecha"} onPress={addNewDate} btnStyle={{ marginBottom: 30 }} />}

													{!Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar fechas"} onPress={confirmDates} disabled={isDisabled()} btnStyle={{ marginBottom: 30 }} />}
												</View>
											),
											'business': (
												<></>
											),
											'worker': (
												<></>
											)
										}[user?.role]
									}
								</View>
								<View style={{ ...gloStyles.section.secondary }}>
									{
										{
											'client': (
												<>
													<DatesList />

													{Device.isPhone && <BtnSecondary size={'medium'} icon={AddIcon} text={"Añadir fecha"} onPress={addNewDate} btnStyle={{ marginBottom: 10, marginTop: 0 }} />}

													{Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar fechas"} onPress={confirmDates} disabled={isDisabled()} btnStyle={{ marginBottom: 10, marginTop: 10 }} />}
												</>
											),
											'business': (
												<></>
											),
											'worker': (
												<></>
											)
										}[user?.role]
									}
								</View>
							</View>
						</Layout>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
};

ScheduleRequestScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

ScheduleRequestScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
