/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect } from 'react'
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
import { useExpoSendPush } from '../../../hooks/useExpoSendPush';

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { WorkersList } from './components/WorkersList'
import { NavigationTop } from '../../../components/Navigation/Top'
import { NavigationBackButton } from '../../../components/Navigation/BackButton'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'

//Hooks
import useFirebaseGetOne from '../../../hooks/useFirebaseGetOne'

//Hooks
import useFirebaseGetAllWhere from '../../../hooks/useFirebaseGetAllWhere'

//Icons
import { BellIcon } from '../../../assets/icons/Bell'

// eslint-disable-next-line no-unused-vars
export const WorkerAssignServiceScreen = ({ debug, navigation, route }) => {

	const sid = route?.params?.sid;
	const cid = route?.params?.cid;

	//Hooks
	// eslint-disable-next-line no-unused-vars
	const { loading: serviceLoading, result: service, error: serviceError } = useFirebaseGetOne(debug, 'services', 'sid', sid);

	// eslint-disable-next-line no-unused-vars
	const { loading: workersLoading, result: workers, error: workersError } = useFirebaseGetAllWhere(debug, 'users', 'cid', cid, false);

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

	//Send Push
	// eslint-disable-next-line no-unused-vars
	const { sended, sendPushNotification } = useExpoSendPush(debug);

	const notifyWorker = async () => {
		const workerPushToken = workers.find(wo => wo.uid === service?.asignedWorker).pushToken
		const companyUid = service.companies.find(co => co.cid === cid).uid
		await sendPushNotification(
			workerPushToken,
			companyUid,
			service?.asignedWorker,
			'¡Servicio asignado!',
			`Te han asignado un nuevo servicio`,
			{ sid },
		);
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

									<TitleScreen icon={'plus-circle-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 }, primaryText: { lineHeight: Device?.isPhone ? 35 : 'initial', marginTop: Device?.isPhone ? 14 : 0 } }} primaryText={'Selecciona un empleado'} secondaryText={''} />

									<View style={{ paddingLeft: 45 }}>

										{/*BOTÓN NOTIFICAR*/}
										{(!Device.isPhone && service?.asignedWorker) && <BtnPrimary size={'medium'} icon={BellIcon} text={"Notificar al empleado"} onPress={notifyWorker} disabled={!service?.asignedWorker} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

										<NavigationBackButton show={!Device.isPhone} />
									</View>
								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									{/*BOTÓN NOTIFICAR*/}
									{(Device.isPhone && service?.asignedWorker) && <BtnPrimary size={'medium'} icon={BellIcon} text={"Notificar al empleado"} onPress={notifyWorker} disabled={!service?.asignedWorker} status={'primary'} btnStyle={{ marginBottom: 30 }} />}

									{/*SECCIÓN EMPRESAS*/}
									<WorkersList workers={workers || []} asignedWorker={service?.asignedWorker} sid={sid} />

									<NavigationBackButton show={Device.isPhone} btnStyle={{ marginTop: 0 }} />
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

WorkerAssignServiceScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

WorkerAssignServiceScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
