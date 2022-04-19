import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';

//Components
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import { BtnImageCombo } from '../Buttons/ImageCombo'
import { BtnSecondary } from '../Buttons/Secondary'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { CameraIcon } from '../../assets/icons/Camera'

// eslint-disable-next-line no-unused-vars
export const ImgClient = ({ debug }) => {
	const dispatch = useDispatch()

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//State
	const [selectedImage, setSelectedImage] = useState(user?.metadata?.photoFirebaseURL ? { localUri: user?.metadata?.photoFirebaseURL } : null);
	const [showChangeImage, setShowChangeImage] = useState(false);

	useEffect(() => {
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{selectedImage !== null
				? <TouchableWithoutFeedback onPress={() => setShowChangeImage(!showChangeImage)}>
					<Image
						source={{ uri: selectedImage.localUri }}
						style={{ width: '100%', minHeight: 325, marginBottom: 10 }}
					/>
				</TouchableWithoutFeedback>
				: <BtnSecondary disabled={false} icon={CameraIcon} text={'Añadir foto'} onPress={() => setShowChangeImage(true)} />
			}

			<BtnImageCombo
				showChangeImage={showChangeImage}
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>
		</View>
	)
};

ImgClient.propTypes = {
	debug: PropTypes.bool.isRequired,
};

ImgClient.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
