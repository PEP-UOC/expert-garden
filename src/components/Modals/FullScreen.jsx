import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector } from 'react-redux'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { Text, Modal, Spinner } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const ModalFullScreen = ({ debug }) => {

    //Loading
    const loadingMessage = useSelector(state => state.rootReducer.loadingMessage);

    console.log('🫧 loadingMessage', loadingMessage)

    //Styles
    const ownStyles = useStyleSheet(styles);

    return (
        <Modal
            visible={loadingMessage}
            backdropStyle={{ ...ownStyles.fullScreen.backdrop }}
        >
            <View style={{ ...ownStyles.fullScreen.view }}>
                <Text style={{ ...ownStyles.fullScreen.text }}>{loadingMessage}</Text>
                <Spinner size='giant' />
            </View>
        </Modal >
    )
};

ModalFullScreen.propTypes = {
    debug: PropTypes.bool.isRequired
};

ModalFullScreen.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};