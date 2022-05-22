import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'
//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { View } from 'react-native'
import { Text, Modal, Card } from '@ui-kitten/components';

// eslint-disable-next-line no-unused-vars
export const ModalError = ({ debug }) => {
	const dispatch = useDispatch()

	//Loading
	const errorMessage = useSelector(state => state.rootReducer.errorMessage);

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<Modal
			visible={errorMessage}
			backdropStyle={{ ...ownStyles.error.backdrop }}
			onBackdropPress={() => dispatch(setErrorMessage(false))}>
			<Card disabled={true}>
				<View style={{ ...ownStyles.error.view }}>
					<Text style={{ ...ownStyles.error.text, marginTop: 10 }}>{errorMessage}</Text>
					<View style={{ alignItems: 'center', marginBottom: 10 }}>
						<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
					</View>
				</View>
			</Card>
		</Modal>
	)
};

ModalError.propTypes = {
	debug: PropTypes.bool.isRequired
};

ModalError.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
