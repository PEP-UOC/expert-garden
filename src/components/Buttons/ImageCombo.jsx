/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';

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
import Device from '../../libs/react-native-device-detection';
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

	//Más información: https://docs.expo.dev/versions/latest/sdk/media-library/
	//TODO Configuración de producción: https://docs.expo.dev/versions/latest/sdk/media-library/#permissions

	//Más información: https://docs.expo.dev/versions/latest/sdk/camera/
	//TODO Configuración de producción: https://docs.expo.dev/versions/latest/sdk/camera/#camerarequestpermissionsasync

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

		consola('normal', `🎞  IMCO - Nueva fotografía desde la galería → H: ${pickerResult?.height}px`, `W: ${pickerResult?.width}px`);

		await handleImagePicked(pickerResult);
	}
	useEffect(() => {
		if (pickerHasPermission) {
			consola('normal', '✅ IMCO - Hay permisos para adjuntar fotos desde el dispositivo')
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
			consola('normal', '✅ IMCO - Hay permisos para hacer fotos')
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
				: <Text category='c1' style={{ ...gloStyles?.smallText, ...ownStyles?.btnImageComboTextAlternative }} >{!Device.isPhone ? `Haz click en` : `Toca`} la foto para {changeOrAddSecoText}</Text>}
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
