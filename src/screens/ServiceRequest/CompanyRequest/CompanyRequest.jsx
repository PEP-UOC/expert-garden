import React, { useEffect, useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { addDate } from '../../../store/service/serviceAction';

//Data
import { servicesTypes } from '../../../data/servicesTypes'

//Hooks
import { useFirebaseSaveServiceDetail } from "../../../hooks/useFirebaseSaveServiceDetail"

//Components
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Layout, Button, Text, Input, Icon } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { TitleSection } from '../../../components/Titles/Section'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
import { DatesList } from "./components/DatesList"

//Icons
import { AddIcon } from '../../../assets/icons/Add'
import { TruckIcon } from '../../../assets/icons/Truck'

//Modales
import { ModalOptions } from '../../../components/Modals/Options';

//Moment
import moment from 'moment';

//uuid
import uuid from 'react-native-uuid';

// eslint-disable-next-line no-unused-vars
export const CompanyRequestScreen = ({ debug, navigation, route }) => {
	const dispatch = useDispatch();

	const sid = route.params.sid;
	console.log('sid', sid)

	//Store
	const user = useSelector(state => state.userReducer.user);
	const serviceTemporal = useSelector(state => state.serviceReducer.serviceTemporal);

	//State
	// eslint-disable-next-line no-unused-vars
	const [isEdit, setIsEdit] = useState(false);

	const [values, setValues] = useState(serviceTemporal)

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const [saved, setSaved, handleRemoveServiceDetail, handleSaveServiceDetail, handleSaveService] = useFirebaseSaveServiceDetail(debug)

	const renderCaption = (caption) => {
		return (
			<Text style={{ ...gloStyles.inputs.captionText }}>{caption}</Text>
		)
	}

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

	function addNewDate() {
		const dateBasic = {
			did: uuid.v4(),
			date: moment().format("DD/MM/YYYY"),
			dateTime: "",
			schedule: "",
			extra: ""
		}
		dispatch(addDate(dateBasic));
	}

	function confirmDates() {
		console.log('confirmDates', confirmDates)
	}

	function hideModal() {
		setSdidToRemove(undefined)
		setShowDeleteConfirm(false)
	}

	//useEffect(() => {
	//	if (saved) {
	//		navigation.push("CompanyRequestScreen", { sid: saved })
	//	}
	//}, [saved]);


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
									<TitleScreen icon={'clock-outline'} exterStyles={{ wrapper: { marginBottom: 15 } }} primaryText={'Empresas'} secondaryText={'Puedes añadir tantas fechas como quieras. Cuantas más fechas tengas disponibles más fácil será para las empresas ofrecerte el servicio. Estas fechas serán utilizadas para realizar el servicio o para relizar la visita previa si es necesaria.'} />
									{
										{
											'client': (
												<>
													{Platform.OS === "web" && <BtnPrimary size={'medium'} icon={AddIcon} text={"Añadir fecha"} onPress={addNewDate} />}

													{Platform.OS === "web" && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar fechas"} onPress={confirmDates} />}
												</>
											),
											'business': (
												<>
													{Platform.OS === "web" && <BtnPrimary size={'medium'} icon={AddIcon} text={"Añadir fecha"} onPress={addNewDate} />}

													{Platform.OS === "web" && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar fechas"} onPress={confirmDates} />}
												</>
											)
										}[user?.role]
									}
								</View>
								<View style={{ ...gloStyles.section.secondary }}>
									<SeparatorTopSection />
									{
										{
											'client': (
												<>
													<DatesList />

													{Platform.OS !== "web" && <BtnPrimary size={'medium'} icon={AddIcon} text={"Añadir fecha"} onPress={addNewDate} />}

													{Platform.OS !== "web" && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar fechas"} onPress={confirmDates} />}
												</>
											),
											'business': (
												<>

												</>
											),
											'worker': (
												<>

												</>
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

CompanyRequestScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

CompanyRequestScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
