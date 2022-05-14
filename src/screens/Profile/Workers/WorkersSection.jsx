import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Button } from '@ui-kitten/components'
import { TitleSection } from '../../../components/Titles/Section'

//Device Detect
import Device from '../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

//Icons
import { PeopleIcon } from '../../../assets/icons/People'
import { PersonAddIcon } from '../../../assets/icons/PersonAdd'

// eslint-disable-next-line no-unused-vars
export const WorkersSection = ({ debug }) => {
	const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Navigation
	const navigateWorkersList = () => {
		navigation.navigate('WorkersListScreen');
	};
	const navigateWorkersAdd = () => {
		navigation.navigate('WorkersAddScreen');
	};

	return (
		<View style={{ ...ownStyles?.wrapper, marginBottom: 40 }}>
			<TitleSection icon={'people-outline'} primaryText={'Empleados'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				<View style={{
					...gloStyles?.inputs?.row,
					marginBottom: Device.isPhone ? 0 : 20
				}}>
					<Button style={{
						...gloStyles?.button,
						marginBottom: Device.isPhone ? 20 : 0
					}} size='medium'
						accessoryLeft={PeopleIcon}
						status='primary'
						onPress={navigateWorkersList}
					>Ver empleados</Button>

					<Button style={{
						...gloStyles?.button,
					}} size='medium'
						accessoryLeft={PersonAddIcon}
						status='primary' appearance='outline'
						onPress={navigateWorkersAdd}
					>Añadir nuevo</Button>
				</View>
			</View>
		</View>
	)
};

WorkersSection.propTypes = {
	debug: PropTypes.bool.isRequired,
};

WorkersSection.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
