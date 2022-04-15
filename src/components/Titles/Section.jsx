import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';


// eslint-disable-next-line no-unused-vars
export const TitleSection = ({ debug, icon, primaryText, secondaryText }) => {

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    return (
        <View style={{ ...ownStyles?.sectionWrapper }}>
            {!Device.isPhone && icon !== '' && <Icon width={50} height={37} name={icon} fill='#094c3f' />}
            <Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.sectionText }}>{primaryText}</Text>
            <Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.sectionText }}>{secondaryText}</Text>
        </View >
    )
};

TitleSection.propTypes = {
    debug: PropTypes.bool.isRequired,
    icon: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
};

TitleSection.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};