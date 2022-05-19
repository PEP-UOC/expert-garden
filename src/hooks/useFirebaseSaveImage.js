import { useState, useEffect } from 'react';
import consola from '../libs/myLogger';

//Store
import { useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';

//Device Detect
//import Device from '../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion, increment } from 'firebase/firestore';
import 'firebase/compat/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

export function useFirebaseSaveImage(debug, savedEntity, entityType) {
	const dispatch = useDispatch();

	//State
	const [entity, setNewEntity] = useState(savedEntity);

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;
	const storage = firebase.app().storage('gs://expert-garden.appspot.com');
	const storageRef = storage.ref();

	const [selectedImage, setSelectedImage] = useState(null);
	const [storagePath, setStoragePath] = useState(null);
	const [storageIdentifier, setStorageIdentifier] = useState(null);

	//Dynamic config
	useEffect(() => {
		switch (entityType) {
			case 'user':
				if (entity?.metadata?.photoCounter > 0) {
					setSelectedImage(
						entity?.metadata?.photoFirebaseURL
							? { localUri: entity?.metadata?.photoFirebaseURL }
							: null,
					);
				} else {
					setSelectedImage(null);
				}
				setStoragePath('userImages');
				setStorageIdentifier(`${auth()?.currentUser?.uid}_${entity?.metadata?.photoCounter}`);
				break;
			case 'garden':
				if (entity?.imageCounter > 0) {
					setSelectedImage(
						entity?.images[entity?.imageCounter - 1]?.photoFirebaseURL
							? { localUri: entity?.images[entity?.imageCounter - 1]?.photoFirebaseURL }
							: null,
					);
				} else {
					setSelectedImage(null);
				}
				setStoragePath('gardenImages');
				setStorageIdentifier(`${entity.gid}_${entity.imageCounter}`);
				break;
			default:
				consola(
					'normal',
					'🩸 FISI - entityType no contemplado en src/hooks/useFirebaseSaveImage.js',
				);
				break;
		}
	}, [entity]);

	const handleImagePicked = async (pickerResult) => {
		consola('normal', `🕳  FISI - Dispatch Loading START`);
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
			consola('normal', `🕳  FISI - Dispatch Loading STOP`);
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
				consola('error', '🩸 FISI');
				consola('error', error);
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		const fileRef = storageRef.child(`/${storagePath}/${storageIdentifier}`);
		const result = await uploadBytes(fileRef, blob);
		consola(
			'normal',
			`📤 FISI - Fotografía de tipo ${entityType} subida a Firebase Storage | Bucket: ${result.metadata.bucket} | Path: ${result.metadata.fullPath}`,
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
				auth()
					.currentUser.updateProfile({
						photoURL: url,
					})
					.then(() => {
						firestore()
							.collection('users')
							.doc(auth()?.currentUser?.uid)
							.update({
								metadata: {
									...entity?.metadata,
									photoCounter: parseInt(entity?.metadata?.photoCounter) + 1,
									photoFirebaseURL: url,
									photoFirebaseFullPath: firebaseFullPath,
								},
							})
							.then(() => {})
							.catch((error) => {
								console.error(error.message);
								consola('normal', `🕳  FISI - Dispatch Loading STOP`);
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
						consola('normal', `🕳  FISI - Dispatch Loading STOP`);
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
			case 'garden':
				firestore()
					.collection('gardens')
					.doc(entity.gid)
					.update({
						images: arrayUnion({
							photoFirebaseURL: url,
							photoFirebaseFullPath: firebaseFullPath,
						}),
						imageCounter: increment(1),
					})
					.then(() => {
						consola('normal', `🕳  FISI - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
						dispatch(setErrorMessage(false));
					})
					.catch((error) => {
						console.error(error.message);
						consola('normal', `🕳  FISI - Dispatch Loading STOP`);
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
				consola(
					'normal',
					'🩸 FISI - entityType no contemplado en src/hooks/useFirebaseSaveImage.js',
				);
				break;
		}
	};

	return [
		selectedImage,
		handleImagePicked,
		(newEntity) => {
			//consola('normal','⚪️ FISI - SET newEntity', newEntity.row);
			setNewEntity(newEntity);
		},
	];
}
