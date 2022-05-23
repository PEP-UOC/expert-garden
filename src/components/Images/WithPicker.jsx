/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/root/rootAction';

//Components
import { View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { BtnImageCombo } from '../Buttons/ImageCombo'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { PlusIcon } from '../../assets/icons/Plus'
import { MinusIcon } from '../../assets/icons/Minus'
import { CameraIcon } from '../../assets/icons/Camera'
import { SyncIcon } from '../../assets/icons/Sync'

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

//Img Picker
import { Camera } from 'expo-camera';
let camera = Camera;

//Hooks
import { useFirebaseSaveImage } from "../../hooks/useFirebaseSaveImage"

// eslint-disable-next-line no-unused-vars
export const ImgWithPicker = ({ debug, entity, entityType }) => {
	const dispatch = useDispatch()

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Image Hook
	const [selectedImage, handleImagePicked, setNewEntity] = useFirebaseSaveImage(debug, entity, entityType)

	useEffect(() => {
		setNewEntity(entity)
	}, [entity]);

	//State
	const [showImageChangeCombo, setShowImageChangeCombo] = useState(false);
	const [changeOrAdd, setChangeOrAdd] = useState('change');

	//Camera state
	const [showCamera, setShowCamera] = useState(false);
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
	const [cameraZoom, setCameraZoom] = useState(0);

	const zoomUp = () => {
		cameraType === 2
			? cameraZoom + 0.001 < 0.02 && setCameraZoom(cameraZoom + 0.001)
			: cameraZoom + 0.001 < 0.2 && setCameraZoom(cameraZoom + 0.01);
	}

	const zoomDown = () => {
		cameraType === 2
			? cameraZoom - 0.001 > 0 ? setCameraZoom(cameraZoom - 0.001) : setCameraZoom(0)
			: cameraZoom - 0.001 > 0 ? setCameraZoom(cameraZoom - 0.01) : setCameraZoom(0);
	}

	useEffect(() => {
		setCameraZoom(0)
	}, [setShowCamera]);

	useEffect(() => {
		switch (entityType) {
			case 'user':
				setChangeOrAdd('change')
				break;
			case 'garden':
				setChangeOrAdd('add')
				break;
			default:
				setChangeOrAdd('change')
				break;
		}
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		if (selectedImage?.localUri) {
			consola('normal', `🖼  WIPI - Nueva imágen ${selectedImage?.localUri}`)
			return
		}
		if (selectedImage === null) {
			setShowImageChangeCombo(true)
			return
		}
	}, [selectedImage]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{
				showCamera
					? <Camera
						style={{ ...ownStyles?.camera }}
						type={cameraType}
						ratio={'1:1'}
						zoom={cameraZoom}
						ref={(r) => {
							camera = r
						}}>
						<View style={{ ...ownStyles?.cameraZoomView }}>
							{Device.isPhone
								? <TouchableOpacity
									onPress={zoomDown} style={{ ...ownStyles?.cameraTouchable }}
								>
									<MinusIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
								</TouchableOpacity>
								: <View></View>
							}
							{Device.isPhone
								? <TouchableOpacity
									onPress={zoomUp} style={{ ...ownStyles?.cameraTouchable }}
								>
									<PlusIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
								</TouchableOpacity>
								: <View></View>
							}
						</View>
						<View style={{ ...ownStyles?.cameraView }}>
							{Device.isPhone
								? <TouchableOpacity
									onPress={() => {
										if (cameraType === Camera.Constants.Type.back) {
											setCameraType(Camera.Constants.Type.front)
											setCameraZoom(0)
										} else {
											setCameraType(Camera.Constants.Type.back)
											setCameraZoom(0)
										}
									}} style={{ ...ownStyles?.cameraTouchable }}
								>
									<SyncIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
								</TouchableOpacity>
								: <View></View>
							}

							<TouchableOpacity
								onPress={async () => {
									const pickerResult = await camera.takePictureAsync()

									consola('normal', `🎞  WIPI - Nueva fotografía desde la cámara → H: ${pickerResult?.height}px`, `W: ${pickerResult?.width}px`);

									setShowCamera(false)

									await handleImagePicked(pickerResult);
								}} style={{ ...ownStyles?.cameraTouchable }}
							>
								<CameraIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
							</TouchableOpacity>
						</View>
					</Camera>
					: selectedImage !== null
						? <TouchableWithoutFeedback onPress={() => setShowImageChangeCombo(!showImageChangeCombo)}
							accessible={true}
							accessibilityLabel="Mostrar selector de imágen"
							accessibilityHint="Mostrar selector de imágen">
							<Image
								source={{ uri: selectedImage?.localUri }}
								style={{ ...ownStyles?.image }}
							/>
						</TouchableWithoutFeedback>
						: null
			}

			<BtnImageCombo
				showImageChangeCombo={showImageChangeCombo}
				showingCamera={showCamera}
				setShowCamera={setShowCamera}
				selectedImage={selectedImage}
				handleImagePicked={handleImagePicked}
				changeOrAdd={changeOrAdd}
			/>
		</View>
	)
};

ImgWithPicker.propTypes = {
	debug: PropTypes.bool.isRequired,
	entity: PropTypes.object.isRequired,
	entityType: PropTypes.string.isRequired,
};

ImgWithPicker.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
