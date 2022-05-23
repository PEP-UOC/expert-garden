/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

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
