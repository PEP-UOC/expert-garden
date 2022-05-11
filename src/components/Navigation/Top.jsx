import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

//Icons
import { BackIcon } from '../../assets/icons/Back'

// eslint-disable-next-line no-unused-vars
export const NavigationTop = ({ debug, title }) => {

	//Navigation
	const navigation = useNavigation();

	const navigateBack = () => {
		navigation.goBack();
	};

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	return (
		<>
			<TopNavigation title={title} alignment='center' accessoryLeft={BackAction} />
			<Divider />
		</>
	)
};

NavigationTop.propTypes = {
	debug: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

NavigationTop.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	title: '',
};
