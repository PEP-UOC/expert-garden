import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
//Components
import { View } from 'react-native'
import { Button } from '@ui-kitten/components'
import { TitleSection } from '../../../../components/Titles/Section'

//Icons
import { PeopleIcon } from '../../../../assets/icons/People'
import { PersonAddIcon } from '../../../../assets/icons/PersonAdd'

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
			<TitleSection icon={'options-outline'} primaryText={'Empleados'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				<Button style={{
					...gloStyles?.button,
					marginBottom: 20
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
	)
};

WorkersSection.propTypes = {
	debug: PropTypes.bool.isRequired,
};

WorkersSection.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
