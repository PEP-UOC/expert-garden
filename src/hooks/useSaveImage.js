import { useState, useEffect } from 'react';

//Store
import { useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';
import { updateUser } from '../store/user/userAction';

//Device Detect
//import Device from '../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

export function useSaveImage(debug, entity, entityType) {
	const dispatch = useDispatch();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;
	const storage = firebase.app().storage('gs://expert-garden.appspot.com');
	const storageRef = storage.ref();

	const [selectedImage, setSelectedImage] = useState(null);
	const [storagePath, setStoragePath] = useState(null);
	const [storageIdentifier, setStorageIdentifier] = useState(null);

	//Dynamic congif
	useEffect(() => {
		switch (entityType) {
			case 'user':
				setSelectedImage(
					entity?.metadata?.photoFirebaseURL
						? { localUri: entity?.metadata?.photoFirebaseURL }
						: null,
				);
				setStoragePath('userImages');
				setStorageIdentifier(auth().currentUser.uid);
				break;
			default:
				console.log('entityType no contemplado en src/hooks/useSaveImage.js');
				break;
		}
	}, []);

	const handleImagePicked = async (pickerResult) => {
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));
		try {
			if (!pickerResult.cancelled) {
				const { uploadUrl, firebaseFullPath } = await uploadImageAsync(pickerResult.uri);
				await saveImage(uploadUrl, firebaseFullPath);
				setSelectedImage({ localUri: uploadUrl });
			}
			dispatch(setErrorMessage(false));
		} catch (error) {
			console.error(error.message);
			dispatch(
				setErrorMessage(
					debug
						? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
						: firebaseErrorCodeMap(error.code),
				),
			);
		} finally {
			dispatch(setLoadingMessage(false));
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
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		const fileRef = storageRef.child(`/${storagePath}/${storageIdentifier}`);
		const result = await uploadBytes(fileRef, blob);
		console.log(
			`📤 Fotografía de tipo ${entityType} subida a Firebase Storage | Bucket: ${result.metadata.bucket} | Path: ${result.metadata.fullPath}`,
		);

		// We're done with the blob, close and release it
		if (Platform.OS !== 'web') {
			blob.close();
		}

		const downloadURL = await getDownloadURL(fileRef);

		return { uploadUrl: downloadURL, firebaseFullPath: result?.metadata?.fullPath };
	};

	const saveImage = async (url, firebaseFullPath) => {
		switch (entityType) {
			case 'user':
				firestore()
					.collection('users')
					.doc(auth().currentUser.uid)
					.update({
						metadata: {
							...entity?.metadata,
							photoFirebaseURL: url,
							photoFirebaseFullPath: firebaseFullPath,
						},
					})
					.then(() => {
						auth()
							.currentUser.updateProfile({
								photoURL: url,
							})
							.then(() => {
								auth().onAuthStateChanged((updatedUser) => {
									if (updatedUser) {
										dispatch(
											updateUser({
												metadata: {
													...entity?.metadata,
													photoFirebaseURL: url,
													photoFirebaseFullPath: firebaseFullPath,
												},
												user: updatedUser,
											}),
										);
										dispatch(setLoadingMessage(false));
										dispatch(setErrorMessage(false));
									}
								});
							})
							.catch((error) => {
								console.error(error.message);
								dispatch(setLoadingMessage(false));
								dispatch(
									setErrorMessage(
										debug
											? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
											: firebaseErrorCodeMap(error.code),
									),
								);
							});
					})
					.catch((error) => {
						console.error(error.message);
						dispatch(setLoadingMessage(false));
						dispatch(
							setErrorMessage(
								debug
									? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
									: firebaseErrorCodeMap(error.code),
							),
						);
					});
				break;
			default:
				console.log('entityType no contemplado en src/hooks/useSaveImage.js');
				break;
		}
	};

	return [selectedImage, handleImagePicked];
}
