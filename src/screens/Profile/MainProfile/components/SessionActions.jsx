import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { TitleSection } from '../../../../components/Titles/Section'
import { BtnLogout } from '../../../../components/Buttons/Logout'

// eslint-disable-next-line no-unused-vars
export const SessionActionsBtns = ({ debug }) => {
	//const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'folder-outline'} primaryText={'Otros'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				<View style={{ ...gloStyles?.inputs?.row }}>
					<BtnLogout />
				</View>
			</View>
		</View>
	)
};

SessionActionsBtns.propTypes = {
	debug: PropTypes.bool.isRequired,
};

SessionActionsBtns.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
