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
export const SeparatorTop = ({ debug }) => {

    //Styles
    const ownStyles = useStyleSheet(styles);

    return (
        <View style={{ ...ownStyles.topSeparator }}></View>
    )
};

SeparatorTop.propTypes = {
    debug: PropTypes.bool.isRequired,
};

SeparatorTop.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};