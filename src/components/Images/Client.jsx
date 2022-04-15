import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View, Image } from 'react-native'
import { Button } from '@ui-kitten/components'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'


// eslint-disable-next-line no-unused-vars
export const ImgClient = ({ debug, uri }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    return (
        <View style={{ ...ownStyles?.wrapper }}>
            <Image source={{ uri }}
                style={{ width: '100%', minHeight: 400 }} />
        </View>
    )
};

ImgClient.propTypes = {
    debug: PropTypes.bool.isRequired,
    uri: PropTypes.string.isRequired,
};

ImgClient.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};