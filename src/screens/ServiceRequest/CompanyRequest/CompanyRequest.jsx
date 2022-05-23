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
import { StatusBar } from 'expo-status-bar';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
//import styles from './styles'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Hooks
import { useFirebaseServiceUtils } from "../../../hooks/useFirebaseServiceUtils"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { CompanyList } from "./components/CompanyList"

//Icons
import { TruckIcon } from '../../../assets/icons/Truck'

//Hooks
import useFirebaseGetAll from '../../../hooks/useFirebaseGetAll'

// eslint-disable-next-line no-unused-vars
export const CompanyRequestScreen = ({ debug, navigation, route }) => {
	const sid = route.params.sid;

	//State
	// eslint-disable-next-line no-unused-vars
	const [isEdit, setIsEdit] = useState(false);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	//const ownStyles = useStyleSheet(styles);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleSaveService } = useFirebaseServiceUtils(debug)

	//Hooks
	// eslint-disable-next-line no-unused-vars
	const { loading: companiesLoading, result: companies, error: companiesError } = useFirebaseGetAll(debug, 'companies', 'cid', false);

	function confirmService() {
		handleSaveService({ sid, companies, what: 'companies' }, true)
	}

	useEffect(() => {
		if (saved) {
			navigation.navigate("Services")
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

								<View style={{ ...gloStyles.section.primary }}>
									<TitleScreen icon={'pantone-outline'} exterStyles={{ wrapper: { marginBottom: Device?.isPhone ? 20 : 30 } }} primaryText={'Empresas'} secondaryText={'🚨 Debido a que en estos momentos hay pocas empresas disponibles para realizar el trabajo cerca de tí, la selección de empresas en este punto será automática.'} />

									<View style={{ paddingLeft: 45 }}>
										{!Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar servicio"} onPress={confirmService} />}
									</View>
								</View>

								<View style={{ ...gloStyles.section.secondary }}>

									<CompanyList />

									{Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar servicio"} onPress={confirmService} />}
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

CompanyRequestScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

CompanyRequestScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
