import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native';

// eslint-disable-next-line no-unused-vars
export const SeparatorTop = ({ debug }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    return (
        <View style={{ ...fullStyles.topSeparator }}></View>
    )
};

SeparatorTop.propTypes = {
    debug: PropTypes.bool.isRequired,
};

SeparatorTop.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};