/*
    Copyright(C) 2022 Jose Fernández Marín

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

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
