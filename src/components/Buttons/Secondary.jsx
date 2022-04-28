import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View } from 'react-native'
import { Button } from '@ui-kitten/components'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'


// eslint-disable-next-line no-unused-vars
export const BtnSecondary = ({ debug, icon, text, onPress, disabled, size, btnStyle }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<Button
				style={
					{
						...gloStyles?.button,
						...ownStyles?.btnSecondary,
						...btnStyle
					}
				}
				size={size}
				onPress={onPress}
				accessoryLeft={icon}
				disabled={disabled}
				appearance='outline'
			>
				{text}
			</Button>
		</View>
	)
};

BtnSecondary.propTypes = {
	debug: PropTypes.bool.isRequired,
	icon: PropTypes.func,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func,
	disabled: PropTypes.bool.isRequired,
	size: PropTypes.string.isRequired,
	btnStyle: PropTypes.object.isRequired,
};

BtnSecondary.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	icon: undefined,
	disabled: false,
	btnStyle: {},
};
