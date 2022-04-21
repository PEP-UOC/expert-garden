import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/root/rootAction';

//Components
import { View } from 'react-native'
import { ButtonGroup, Button, Text } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { CloseIcon } from '../../assets/icons/Close'
import { CameraIcon } from '../../assets/icons/Camera'
import { ImageIcon } from '../../assets/icons/Image'

//Device Detect
//import Device from '../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Img Picker
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';


// eslint-disable-next-line no-unused-vars
export const BtnImageCombo = ({ debug, showImageChangeCombo, showingCamera, setShowCamera, selectedImage, handleImagePicked, changeOrAdd }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//PICKER
	const [pickerHasPermission, setPickerHasPermission] = useState(null);
	const [pickerPermissionError, setPickerPermissionError] = useState(null);
	const openImagePickerAsync = async () => {

		setPickerPermissionError(null)
		setCameraPermissionError(null)
		if (showingCamera) {
			setShowCamera(false);
		}

		if (Platform.OS !== "web") {
			const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setPickerHasPermission(permissionResult.granted);

			if (permissionResult.granted === false) {
				const error = "¡Se necesitan permisos para acceder a la galería de imágenes!";
				setPickerPermissionError(error)
				dispatch(setErrorMessage(error))
				return;
			}
		} else {
			setPickerHasPermission(true);
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
		});

		console.log('🎞 Nueva fotografía desde la galería', `H: ${pickerResult?.height}px`, `W: ${pickerResult?.width}px`);

		await handleImagePicked(pickerResult);
	}
	useEffect(() => {
		if (pickerHasPermission) {
			console.log('✅ Hay permisos para adjuntar fotos desde el dispositivo')
		}
	}, [pickerHasPermission]);

	//CAMERA
	const [cameraHasPermission, setCameraHasPermission] = useState(null);
	const [cameraPermissionError, setCameraPermissionError] = useState(null);
	const openCameraAsync = async () => {

		setPickerPermissionError(null)
		setCameraPermissionError(null)
		if (showingCamera) {
			setShowCamera(false);
			return
		}

		const permissionResult = await Camera.requestCameraPermissionsAsync();
		setCameraHasPermission(permissionResult.granted);

		if (permissionResult.granted === false) {
			const error = "¡Se necesitan permisos para acceder a la cámara de fotos!";
			setCameraPermissionError(error)
			dispatch(setErrorMessage(error))
			return
		}

		setShowCamera(true);
	}
	useEffect(() => {
		if (cameraHasPermission) {
			console.log('✅ Hay permisos para hacer fotos')
		}
	}, [cameraHasPermission]);

	//COMBO TEXT
	// eslint-disable-next-line no-unused-vars
	const [changeOrAddMainText, setChangeOrAddMainText] = useState(changeOrAdd === 'change' ? 'Cambiar' : 'Añadir');
	// eslint-disable-next-line no-unused-vars
	const [changeOrAddSecoText, setChangeOrAddSecoText] = useState(changeOrAdd === 'change' ? 'cambiarla' : 'añadir más');

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{showImageChangeCombo
				? <>
					<ButtonGroup style={{ ...ownStyles?.btnImageCombo }} appearance='outline'>
						<Button accessoryLeft={showingCamera ? CloseIcon : CameraIcon} onPress={openCameraAsync} />
						<Button style={{ ...ownStyles?.btnImageComboCenter }}>{selectedImage === null ? "← Añadir foto →" : `← ${changeOrAddMainText} foto →`}</Button>
						<Button accessoryLeft={ImageIcon} onPress={openImagePickerAsync} />
					</ButtonGroup>
					{
						pickerPermissionError
						&& <Text category='c1' style={{ ...gloStyles?.smallText, ...ownStyles?.btnImageComboTextAdvice }} >
							{pickerPermissionError}
						</Text>
					}
					{
						cameraPermissionError
						&& <Text category='c1' style={{ ...gloStyles?.smallText, ...ownStyles?.btnImageComboTextAdvice }} >
							{cameraPermissionError}
						</Text>
					}
				</>
				: <Text category='c1' style={{ ...gloStyles?.smallText, ...ownStyles?.btnImageComboTextAlternative }} >{Platform.OS === "web" ? `Haz click en` : `Toca`} la foto para {changeOrAddSecoText}</Text>}
		</View>
	)
};

BtnImageCombo.propTypes = {
	debug: PropTypes.bool.isRequired,
	showImageChangeCombo: PropTypes.bool.isRequired,
	showingCamera: PropTypes.bool.isRequired,
	setShowCamera: PropTypes.func,
	selectedImage: PropTypes.object,
	handleImagePicked: PropTypes.func,
	changeOrAdd: PropTypes.string.isRequired,
};

BtnImageCombo.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
