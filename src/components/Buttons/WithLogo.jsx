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

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'


// eslint-disable-next-line no-unused-vars
export const BtnWithLogo = ({ debug, icon, text, onPress }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    return (
        <View style={{ ...ownStyles?.wrapper }}>
            <LeafIcon width={240} height={90} style={{ ...gloStyles.leaf, ...ownStyles?.logo }} />
            <Button style={{ ...gloStyles?.button, ...ownStyles?.btnWithLogo }} size='large' onPress={onPress} accessoryLeft={icon}>{text}</Button>
        </View>
    )
};

BtnWithLogo.propTypes = {
    debug: PropTypes.bool.isRequired,
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};

BtnWithLogo.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};