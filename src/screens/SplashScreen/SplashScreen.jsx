import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector } from 'react-redux'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Layout, Text, Spinner } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const SplashScreen = ({ debug, isSplash = false }) => {

    //Loading
    const loadingMessage = useSelector(state => {
        //console.log('state', state)
        return state.rootReducer.loadingMessage
    });

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
                contentContainerStyle={{ ...fullStyles.scrollView }}>
                <Layout style={{ ...fullStyles.layout }}>
                    <View style={{ ...fullStyles.splashScreen }}>
                        <Text category='h1' style={{ ...fullStyles?.h1 }}>
                            {isSplash ? 'EXPERT GARDEN' : loadingMessage}</Text>
                        <Spinner size='giant' />
                        {isSplash && (<View style={{ alignItems: 'center' }}>
                            <LeafIcon width={360} height={120} style={{ ...fullStyles?.leaf }} />
                        </View>)}
                    </View>
                </Layout >
            </ScrollView>
        </SafeAreaView>
    )
};

SplashScreen.propTypes = {
    debug: PropTypes.bool.isRequired,
    isSplash: PropTypes.bool
};

SplashScreen.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};