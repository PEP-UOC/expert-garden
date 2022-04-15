import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { Button } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';

//Linking
import * as Linking from 'expo-linking';

export default class BtnExternalLink extends React.Component {
    _handlePress = () => {
        Linking.openURL(this.props.href);
    };

    render() {
        return (
            <Button style={{ width: Device?.isPhone ? '100%' : 325, }} {...this.props} onPress={this._handlePress}>
                {this.props.children}
            </Button>
        );
    }
}

// <BtnExternalLink href="https://google.com">Go to Google</BtnExternalLink>
// <BtnExternalLink href="mailto:support@expo.dev">Email support</BtnExternalLink>

BtnExternalLink.propTypes = {
    debug: PropTypes.bool.isRequired,
    href: PropTypes.string,
    children: PropTypes.string
};

BtnExternalLink.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};