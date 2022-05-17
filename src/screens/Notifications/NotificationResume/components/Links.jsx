import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet, Button } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Icons
import { TruckIcon } from '../../../../assets/icons/Truck'

// eslint-disable-next-line no-unused-vars
export const Links = ({ debug, sid }) => {

	//Navigation
	const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Navigation
	const navigateToServiceResume = () => {
		navigation.navigate("Services", {
			screen: 'ServiceResumeScreen',
			params: { sid },
		});
	};

	return (
		<View style={{ ...ownStyles?.wrapper, width: '100%' }}>
			{sid ? (
				<Button
					style={
						{
							...gloStyles?.button, width: '100%'
						}
					}
					size='medium'
					onPress={() => {
						navigateToServiceResume()
					}}
					accessoryLeft={TruckIcon}
				>
					Ver detalles del servicio
				</Button>
			) : null}
		</View>
	)
};

Links.propTypes = {
	debug: PropTypes.bool.isRequired,
	sid: PropTypes.string.isRequired,
};

Links.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	sid: '',
};
