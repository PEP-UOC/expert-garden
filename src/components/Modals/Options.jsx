import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
//import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { View } from 'react-native'
import { Text, Modal, Card } from '@ui-kitten/components';
import { BtnPrimary } from '../../components/Buttons/Primary'
import { BtnSecondary } from '../../components/Buttons/Secondary'

// eslint-disable-next-line no-unused-vars
export const ModalOptions = ({ debug, mainText, show, setShow, option1text, option1onPress, option2text, option2onPress, backdropPress }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<Modal
			visible={show}
			backdropStyle={{ ...ownStyles.error.backdrop }}
			onBackdropPress={backdropPress || (() => setShow(false))}>
			<Card disabled={true}>
				<View style={{ ...ownStyles.error.view }}>
					<Text style={{
						...ownStyles.fullScreen.text,
						marginBottom: 15,
					}}>{mainText}</Text>
					<BtnPrimary size={'small'} text={option1text} onPress={option1onPress} btnStyle={{ marginBottom: 5 }} />
					<BtnSecondary size={'small'} text={option2text} onPress={option2onPress} btnStyle={{ marginBottom: 0 }} />

					{/*<View style={{ alignItems: 'center' }}>
						<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
					</View>*/}
				</View>
			</Card>
		</Modal >
	)
};

ModalOptions.propTypes = {
	debug: PropTypes.bool.isRequired,
	mainText: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	option1text: PropTypes.string.isRequired,
	option1onPress: PropTypes.func.isRequired,
	option2text: PropTypes.string.isRequired,
	option2onPress: PropTypes.func.isRequired,
	backdropPress: PropTypes.func
};

ModalOptions.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
