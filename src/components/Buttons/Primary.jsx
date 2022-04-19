import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View } from 'react-native'
import { Button } from '@ui-kitten/components'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'


// eslint-disable-next-line no-unused-vars
export const BtnPrimary = ({ debug, icon, text, onPress, disabled, size }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    return (
        <View style={{ ...ownStyles?.wrapper }}>
            <Button
                style={
                    {
                        ...gloStyles?.button,
                        ...ownStyles?.btnPrimary
                    }
                }
                size={size}
                onPress={onPress}
                accessoryLeft={icon}
                disabled={disabled}>
                {text}
            </Button>
        </View>
    )
};

BtnPrimary.propTypes = {
    debug: PropTypes.bool.isRequired,
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
};

BtnPrimary.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
    size: 'large',
};