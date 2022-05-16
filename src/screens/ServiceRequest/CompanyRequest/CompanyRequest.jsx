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

//Hooks
import { useFirebaseServiceUtils } from "../../../hooks/useFirebaseServiceUtils"

//Components
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { TitleScreen } from '../../../components/Titles/Screen'
import { BtnPrimary } from '../../../components/Buttons/Primary'
import { SeparatorTopScreen } from '../../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../../components/Separators/TopSection'
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
									<SeparatorTopSection />

									<CompanyList />

									{Device.isPhone && <BtnPrimary size={'medium'} icon={TruckIcon} text={"Confirmar servicio"} onPress={confirmService} />}
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
