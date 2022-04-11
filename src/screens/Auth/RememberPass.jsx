import React from "react"
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

import { View, Text, TouchableOpacity } from "react-native"

// eslint-disable-next-line no-unused-vars
export const RememberPass = ({ debug, navigation }) => (
    <View
        style={{
            flex: 1,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <TouchableOpacity
            style={{ backgroundColor: "white", padding: 20 }}
            onPress={() => navigation.pop()}
        >
            <Text category='p1'>RememberPass me</Text>
        </TouchableOpacity>
    </View>
);

RememberPass.propTypes = {
    debug: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};

RememberPass.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};