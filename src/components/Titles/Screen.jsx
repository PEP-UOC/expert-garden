import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';


// eslint-disable-next-line no-unused-vars
export const TitleScreen = ({ debug, icon, primaryText, secondaryText }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={
			{
				...ownStyles?.screenWrapper,
				flexDirection: icon !== '' ? 'row' : 'column', alignItems: icon !== '' ? 'center' : 'flex-start'
			}
		}>
			{!Device.isPhone && icon !== '' && <Icon width={60} height={40} name={icon} fill='#094c3f' />}
			<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.screenText }}>{primaryText}</Text>
			<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.screenText }}>{secondaryText}</Text>
		</View>
	)
};

TitleScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
	icon: PropTypes.string,
	primaryText: PropTypes.string.isRequired,
	secondaryText: PropTypes.string.isRequired,
};

TitleScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
