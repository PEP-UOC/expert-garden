import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';

//Components
import { View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { BtnImageCombo } from '../Buttons/ImageCombo'
import { BtnSecondary } from '../Buttons/Secondary'

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
//import Device from '../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Img Picker
import { Camera } from 'expo-camera';
let camera = Camera;

//Hooks
import { useSaveImage } from "../../hooks/useSaveImage"

// eslint-disable-next-line no-unused-vars
export const ImgClient = ({ debug }) => {
	const dispatch = useDispatch()

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//Image Hook
	const [selectedImage, handleImagePicked] = useSaveImage(debug, user)

	//State
	const [showImageChangeCombo, setShowImageChangeCombo] = useState(false);

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
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(false))
	}, []);

	useEffect(() => {
		console.log(`🖼  Nueva imágen ${selectedImage.localUri}`)
	}, [selectedImage]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{selectedImage !== null
				? !showCamera
					? <TouchableWithoutFeedback onPress={() => setShowImageChangeCombo(!showImageChangeCombo)}>
						<Image
							source={{ uri: selectedImage.localUri }}
							style={{ ...ownStyles?.image }}
						/>
					</TouchableWithoutFeedback>
					: <Camera
						style={{ ...ownStyles?.camera }}
						type={cameraType}
						ratio={'1:1'}
						zoom={cameraZoom}
						ref={(r) => {
							camera = r
						}}>
						<View style={{ ...ownStyles?.cameraZoomView }}>
							{Platform.OS !== "web"
								? <TouchableOpacity
									onPress={zoomDown} style={{ ...ownStyles?.cameraTouchable }}
								>
									<MinusIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
								</TouchableOpacity>
								: <View></View>
							}
							{Platform.OS !== "web"
								? <TouchableOpacity
									onPress={zoomUp} style={{ ...ownStyles?.cameraTouchable }}
								>
									<PlusIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
								</TouchableOpacity>
								: <View></View>
							}
						</View>
						<View style={{ ...ownStyles?.cameraView }}>
							{Platform.OS !== "web"
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

									console.log('🎞 Nueva fotografía desde la cámara', `H: ${pickerResult?.height}px`, `W: ${pickerResult?.width}px`);

									setShowCamera(false)

									await handleImagePicked(pickerResult);
								}} style={{ ...ownStyles?.cameraTouchable }}
							>
								<CameraIcon width={24} height={24} fill={ownStyles?.cameraIcon.fill} />
							</TouchableOpacity>
						</View>
					</Camera>
				: <BtnSecondary disabled={false} icon={CameraIcon} text={'Añadir foto'} onPress={() => setShowImageChangeCombo(true)} />
			}

			<BtnImageCombo
				showImageChangeCombo={showImageChangeCombo}
				showingCamera={showCamera}
				setShowCamera={setShowCamera}
				selectedImage={selectedImage}
				handleImagePicked={handleImagePicked}
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
