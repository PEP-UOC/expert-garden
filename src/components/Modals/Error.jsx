import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { Text, Modal, Card } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const ModalError = ({ debug }) => {
    const dispatch = useDispatch()

    //Loading
    const errorMessage = useSelector(state => state.rootReducer.errorMessage);

    //Styles
    const ownStyles = useStyleSheet(styles);

    return (
        <Modal
            visible={errorMessage}
            backdropStyle={{ ...ownStyles.error.backdrop }}
            onBackdropPress={() => dispatch(setErrorMessage(false))}>
            <Card disabled={true}>
                <View style={{ ...ownStyles.error.view }}>
                    <Text style={{ ...ownStyles.error.icons }}>👩‍🌾🧑‍🌾</Text>
                    <Text style={{ ...ownStyles.error.text }}>{errorMessage}</Text>
                </View>
            </Card>
        </Modal>
    )
};

ModalError.propTypes = {
    debug: PropTypes.bool.isRequired
};

ModalError.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};