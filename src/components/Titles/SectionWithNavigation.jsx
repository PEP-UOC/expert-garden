import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View, TouchableWithoutFeedback } from 'react-native'
import { Text, Icon } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';


// eslint-disable-next-line no-unused-vars
export const TitleSectionWithNavigation = ({ debug, exterStyles, icon, primaryText, secondaryText, secondaryTextMain, iconNav, navTo }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={
			{
				...ownStyles?.sectionWrapper,
				...exterStyles?.wrapper,
				alignItems: 'flex-start', alignSelf: 'flex-start', width: '100%'
			}
		}>
			<View style={
				{
					flexDirection: 'row', alignItems: 'center', width: '100%', paddingRight: 0, cursor: 'pointer'
				}
			}>
				{!Device.isPhone && icon !== '' && <Icon width={37} height={37} name={icon} fill='#094c3f' />}
				<TouchableWithoutFeedback
					onPress={() => {
						navTo()
					}}>
					<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.sectionText, ...exterStyles?.primaryText, flex: 1 }}>{primaryText}</Text>
				</TouchableWithoutFeedback>

				{/*ICONO ELIMINAR*/}
				<TouchableWithoutFeedback
					onPress={() => {
						navTo()
					}}>
					<Icon width={37} height={37} name={iconNav} fill='#094c3f' />
				</TouchableWithoutFeedback>
			</View>

			<Text
				category={secondaryTextMain ? 'h2' : 's2'}
				style={secondaryTextMain
					? { ...gloStyles?.h2, ...ownStyles?.sectionText, ...exterStyles?.secondaryText }
					: { ...ownStyles?.sectionText, ...exterStyles?.secondaryText, marginLeft: Device.isPhone ? 0 : secondaryText !== '' ? 61 : 0 }}
			>
				{secondaryText}
			</Text>
		</View>
	)
};

TitleSectionWithNavigation.propTypes = {
	debug: PropTypes.bool.isRequired,
	exterStyles: PropTypes.object.isRequired,
	icon: PropTypes.string,
	primaryText: PropTypes.string.isRequired,
	secondaryText: PropTypes.string.isRequired,
	secondaryTextMain: PropTypes.bool.isRequired,
	iconNav: PropTypes.string,
	navTo: PropTypes.func,
};

TitleSectionWithNavigation.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	exterStyles: { primaryText: {}, secondaryText: {} },
	secondaryTextMain: false,
	iconNav: 'chevron-right-outline',
	navTo: () => console.log('🔴 navTo NO INDICADO'),
};
