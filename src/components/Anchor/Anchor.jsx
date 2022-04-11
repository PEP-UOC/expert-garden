import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Components
import { Button } from '@ui-kitten/components';

//Linking
import * as Linking from 'expo-linking';

export default class Anchor extends React.Component {
    _handlePress = () => {
        Linking.openURL(this.props.href);
        this.props.onPress && this.props.onPress();
    };

    render() {
        return (
            <Button {...this.props} onPress={this._handlePress}>
                {this.props.children}
            </Button>
        );
    }
}

// <Anchor href="https://google.com">Go to Google</Anchor>
// <Anchor href="mailto:support@expo.dev">Email support</Anchor>

Anchor.propTypes = {
    debug: PropTypes.bool.isRequired,
    href: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.string
};

Anchor.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};