import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'

//Components
import { Text } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const ScreenTitle = ({ debug, primaryText, secondaryText }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const fullStyles = { ...gloStyles };

    return (
        <>
            <Text category='h1' style={{ ...fullStyles?.h1 }}>{primaryText}</Text>
            <Text category='h2' style={{ ...fullStyles?.h2 }}>{secondaryText}</Text>
        </>
    )
};

ScreenTitle.propTypes = {
    debug: PropTypes.bool.isRequired,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
};

ScreenTitle.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};