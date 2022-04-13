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
export const BtnWithLogo = ({ debug, icon, text, navigateTo }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    return (
        <View>
            <LeafIcon width={240} height={90} style={{ ...fullStyles.leaf, ...fullStyles?._leaf }} />
            <Button style={{ ...fullStyles?.button, ...fullStyles?.mainWithLogo }} size='large' onPress={navigateTo} accessoryLeft={icon}>{text}</Button>
        </View>
    )
};

BtnWithLogo.propTypes = {
    debug: PropTypes.bool.isRequired,
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    navigateTo: PropTypes.func,
};

BtnWithLogo.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};