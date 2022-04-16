import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native';

// eslint-disable-next-line no-unused-vars
export const SeparatorTopSection = ({ debug }) => {

    //Styles
    const ownStyles = useStyleSheet(styles);

    return (
        <View style={{ ...ownStyles.topSection }}></View>
    )
};

SeparatorTopSection.propTypes = {
    debug: PropTypes.bool.isRequired,
};

SeparatorTopSection.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};