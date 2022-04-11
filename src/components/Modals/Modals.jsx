import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'
import { Text, Modal, Card, Spinner } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
const MainModal = ({ debug }) => {

    //Loading
    const loadingMessage = useSelector(state => state.rootReducer.loadingMessage);

    console.log('loadingMessage', loadingMessage)

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    return (
        <Modal
            visible={loadingMessage}
            backdropStyle={{ ...fullStyles.modal.main.backdrop }}
            onBackdropPress={() => console.log(false)}>
            <View style={{ ...fullStyles.modal.main.view }}>
                {/*<Text style={{ ...fullStyles.modal.main.icons }}>👩‍🌾🧑‍🌾</Text>*/}
                <Text style={{ ...fullStyles.modal.main.text }}>{loadingMessage}</Text>
                <Spinner size='giant' />
            </View>
        </Modal>
    )
};

MainModal.propTypes = {
    debug: PropTypes.bool.isRequired
};

MainModal.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};

// eslint-disable-next-line no-unused-vars
const ErrorModal = ({ debug }) => {
    const dispatch = useDispatch()

    //Loading
    const errorMessage = useSelector(state => state.rootReducer.errorMessage);

    console.log('errorMessage', errorMessage)

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    return (
        <Modal
            visible={errorMessage}
            backdropStyle={{ ...fullStyles.modal.error.backdrop }}
            onBackdropPress={() => dispatch(setErrorMessage(false))}>
            <Card disabled={true}>
                <View style={{ ...fullStyles.modal.error.view }}>
                    <Text style={{ ...fullStyles.modal.error.icons }}>👩‍🌾🧑‍🌾</Text>
                    <Text style={{ ...fullStyles.modal.error.text }}>{errorMessage}</Text>
                </View>
            </Card>
        </Modal>
    )
};

ErrorModal.propTypes = {
    debug: PropTypes.bool.isRequired
};

ErrorModal.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};

export {
    MainModal,
    ErrorModal
}