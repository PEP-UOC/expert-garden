import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { Text } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'


// eslint-disable-next-line no-unused-vars
export const TitleScreen = ({ debug, primaryText, secondaryText }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    return (
        <>
            <Text category='h1' style={{ ...fullStyles?.h1, ...fullStyles?._h1 }}>{primaryText}</Text>
            <Text category='h1' style={{ ...fullStyles?.h1, ...fullStyles?._h1 }}>{secondaryText}</Text>
        </>
    )
};

TitleScreen.propTypes = {
    debug: PropTypes.bool.isRequired,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
};

TitleScreen.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};