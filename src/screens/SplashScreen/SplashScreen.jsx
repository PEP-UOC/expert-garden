import React from 'react'
import PropTypes from "prop-types";
//import consola from '../../libs/myLogger';

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
		//consola('normal','🔦 SPLA - state')
		//consola('normal',state)
		return state.rootReducer.loadingMessage
	});

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView alwaysBounceVertical={true} centerContent={true}
				contentContainerStyle={{ ...gloStyles.scrollView }}>
				<Layout style={{ ...gloStyles.layout }}>
					<View style={{ ...ownStyles.view }}>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title }}>
							{isSplash ? 'EXPERT GARDEN' : loadingMessage}</Text>
						<Spinner size='giant' />
						{isSplash && (<View style={{ alignItems: 'center' }}>
							<LeafIcon width={360} height={120} style={{ ...gloStyles?.leaf, ...ownStyles?.logo }} />
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
