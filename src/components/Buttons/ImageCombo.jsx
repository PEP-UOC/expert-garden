import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';
import { updateUser } from '../../store/user/userAction';

//Components
import { View } from 'react-native'
import { ButtonGroup, Button, Text } from '@ui-kitten/components';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { CameraIcon } from '../../assets/icons/Camera'
import { ImageIcon } from '../../assets/icons/Image'

//Device Detect
//import Device from '../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Img Picker
import * as ImagePicker from 'expo-image-picker';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';


// eslint-disable-next-line no-unused-vars
export const BtnImageCombo = ({ debug, showChangeImage, selectedImage, setSelectedImage }) => {
    const dispatch = useDispatch()

    //Firebase
    const auth = firebase.auth;
    const firestore = firebase.firestore;
    const storage = firebase.app().storage('gs://expert-garden.appspot.com');
    const storageRef = storage.ref();

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    //Store
    const user = useSelector(state => state.userReducer.user);

    //Image Picker
    const [status] = ImagePicker.useCameraPermissions();

    const openImagePickerAsync = async () => {
        if (Platform.OS !== "web") {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Se necesitan permisos para acceder a la galería de imágenes!");
                return;
            }
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log('🎞 Nueva fotografía desde la galería', `H: ${pickerResult?.height}px`, `W: ${pickerResult?.width}px`);

        if (pickerResult.cancelled === true) {
            return;
        }

        handleImagePicked(pickerResult);
    }

    const openCameraAsync = async () => {
        if (Platform.OS !== "web") {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Se necesitan permisos para acceder a la cámara de fotos!");
                return;
            }
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log('📸 Nueva fotografía desde la cámara', `H: ${pickerResult?.height}px`, `W: ${pickerResult?.width}px`);

        if (pickerResult.cancelled === true) {
            return;
        }

        handleImagePicked(pickerResult);
    }

    const handleImagePicked = async (pickerResult) => {
        dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'))
        try {
            if (!pickerResult.cancelled) {
                const { uploadUrl, firebaseFullPath } = await uploadImageAsync(pickerResult.uri);
                setSelectedImage({ localUri: uploadUrl });
                saveImage(uploadUrl, firebaseFullPath)
            }
            dispatch(setErrorMessage(false))
        } catch (error) {
            console.error(error.message);
            dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
        } finally {
            dispatch(setLoadingMessage(false))
        }
    };

    const uploadImageAsync = async (uri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (error) {
                console.log(error);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = storageRef.child(`/userImages/${auth().currentUser.uid}`);
        const result = await uploadBytes(fileRef, blob);
        console.log('📡 Fotografía subida a Firebase Storage', `Bucket: ${result.metadata.bucket}`, `Path: ${result.metadata.fullPath}`);

        // We're done with the blob, close and release it
        if (Platform.OS !== "web") {
            blob.close();
        }

        const downloadURL = await getDownloadURL(fileRef);

        return { uploadUrl: downloadURL, firebaseFullPath: result?.metadata?.fullPath }
    }

    const saveImage = (url, firebaseFullPath) => {
        firestore().collection("users").doc(auth().currentUser.uid).update({
            metadata: {
                ...user?.metadata,
                photoFirebaseURL: url,
                photoFirebaseFullPath: firebaseFullPath,
            }
        })
            .then(() => {
                auth().currentUser.updateProfile({
                    photoURL: url,
                }).then(() => {
                    auth().onAuthStateChanged((updatedUser) => {
                        if (updatedUser) {
                            dispatch(updateUser({
                                metadata: {
                                    ...user?.metadata,
                                    photoFirebaseURL: url,
                                    photoFirebaseFullPath: firebaseFullPath
                                },
                                user: updatedUser
                            }))
                            dispatch(setLoadingMessage(false))
                            dispatch(setErrorMessage(false))
                        }
                    });

                }).catch((error) => {
                    console.error(error.message);
                    dispatch(setLoadingMessage(false))
                    dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
                });
            })
            .catch((error) => {
                console.error(error.message);
                dispatch(setLoadingMessage(false))
                dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
            });
    }

    useEffect(() => {
        if (status?.granted) {
            console.log('✅ Hay permisos para hacer fotos')
        }
    }, [status]);

    return (
        <View style={{ ...ownStyles?.wrapper }}>
            {showChangeImage
                ? <ButtonGroup style={{ ...ownStyles?.btnImageCombo }} appearance='outline'>
                    <Button accessoryLeft={CameraIcon} onPress={openCameraAsync} />
                    <Button style={{ ...ownStyles?.btnImageComboCenter }}>{selectedImage === null ? "← Añadir foto →" : "← Cambiar foto →"}</Button>
                    <Button accessoryLeft={ImageIcon} onPress={openImagePickerAsync} />
                </ButtonGroup>
                : <Text category='c1' style={{ ...gloStyles?.smallText, ...ownStyles?.btnImageComboTextAlternative }} >{Platform.OS === "web" ? `Haz click en` : `Toca`} la foto para cambiarla</Text>}
        </View>
    )
};

BtnImageCombo.propTypes = {
    debug: PropTypes.bool.isRequired,
    showChangeImage: PropTypes.bool.isRequired,
    selectedImage: PropTypes.object,
    setSelectedImage: PropTypes.func,
};

BtnImageCombo.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};