import { useState, useEffect } from 'react';
import consola from '../libs/myLogger';

//Store
import { useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import 'firebase/compat/storage';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

export function useFirebaseSaveGardenDetail(debug) {
	const dispatch = useDispatch();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	const [saved, setSaved] = useState(false);

	const [isEdit, setIsEdit] = useState(false);
	const [itemToEdit, setItemToEdit] = useState(false);
	const [itemToUpdate, setItemToUpdate] = useState(false);
	const [originalItemToUpdate, setOriginalItemToUpdate] = useState(false);

	const handleSaveGardenDetail = async (detailValues, isEdit) => {
		consola('normal', `🕳  FSGD - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		const valuesToSave = JSON.parse(JSON.stringify(detailValues));
		delete valuesToSave['gid'];

		consola('normal', '🚨 FSGD - valuesToSave');
		consola('normal', valuesToSave);

		switch (isEdit) {
			case true:
				try {
					let isMounted = true;
					if (auth().currentUser) {
						firestore()
							.collection('gardens')
							.doc(detailValues.gid)
							.get()
							.then((doc) => {
								if (isMounted) {
									if (doc.exists) {
										var item = doc.data();
										setOriginalItemToUpdate(detailValues);
										setItemToUpdate(valuesToSave);
										setItemToEdit(item);
									} else {
										consola('error', '🩸 FSGD - No such document!');
										setSaved(false);
										dispatch(setErrorMessage(`Error al actualizar el jardín.`));
									}
								}
							})
							.catch((error) => {
								consola('error', `🩸 ERROR - ${error.message}`);
								consola('error', '🩸 FSGD - Error getting document.');
								setSaved(false);
								dispatch(setErrorMessage(`Error al actualizar el jardín.`));
							});
						//.where('gid', '==', detailValues.gid)
						//.get()
						//.then((querySnapshot) => {
						//	if (isMounted) {
						//		const ITEMS = [];
						//		if (!querySnapshot.empty) {
						//			querySnapshot.forEach((item) => {
						//				ITEMS.push(item.data());
						//			});
						//		}
						//		setOriginalItemToUpdate(detailValues);
						//		setItemToUpdate(valuesToSave);
						//		setItemToEdit(ITEMS[0]);
						//	}
						//});
					} else {
						dispatch(
							setErrorMessage(
								debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
							),
						);
					}
				} catch (error) {
					consola('error', `🩸 ERROR - ${error.message}`);
					setSaved(false);
					dispatch(
						setErrorMessage(
							debug
								? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
								: firebaseErrorCodeMap(error.code),
						),
					);
				}
				break;

			case false:
			default:
				try {
					firestore()
						.collection('gardens')
						.doc(detailValues?.gid)
						.update({
							details: arrayUnion(valuesToSave),
						})
						.then(() => {
							consola('normal', `🚧 FSGD - Garden Detail ${detailValues.gdid} guardado`);
							setItemToEdit(false);
							setItemToUpdate(false);
							setSaved(true);
							dispatch(setErrorMessage(false));
						})
						.catch((error) => {
							consola('error', `🩸 ERROR - ${error.message}`);
							dispatch(
								setErrorMessage(
									debug
										? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
										: firebaseErrorCodeMap(error.code),
								),
							);
						});
				} catch (error) {
					consola('error', `🩸 ERROR - ${error.message}`);
					setSaved(false);
					dispatch(
						setErrorMessage(
							debug
								? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
								: firebaseErrorCodeMap(error.code),
						),
					);
				}
				break;
		}
	};

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			const detailToEdit = itemToEdit.details.find((detail) => detail.gdid === itemToUpdate.gdid);
			const detailToIndex = itemToEdit.details.findIndex(
				(detail) => detail.gdid === itemToUpdate.gdid,
			);
			const newDetail = { ...detailToEdit, ...itemToUpdate };
			const detailsArray = itemToEdit.details;
			detailsArray[detailToIndex] = newDetail;

			if (isMounted) {
				try {
					firestore()
						.collection('gardens')
						.doc(originalItemToUpdate?.gid)
						.update({
							details: detailsArray,
						})
						.then(() => {
							consola('normal', `🚧 FSGD - Garden Detail ${itemToUpdate.gdid} actualizado`);
							isMounted = false;
							setItemToEdit(false);
							setItemToUpdate(false);
							setSaved(true);
							dispatch(setErrorMessage(false));
						})
						.catch((error) => {
							consola('error', `🩸 ERROR - ${error.message}`);
							consola('normal', `🕳  FSGD - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
							dispatch(
								setErrorMessage(
									debug
										? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
										: firebaseErrorCodeMap(error.code),
								),
							);
						});
				} catch (error) {
					consola('error', `🩸 ERROR - ${error.message}`);
					setSaved(false);
					dispatch(
						setErrorMessage(
							debug
								? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
								: firebaseErrorCodeMap(error.code),
						),
					);
				}
			}
		};

		if (isEdit && itemToEdit) {
			fetchData();
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};
	}, [itemToEdit]);

	return [
		saved,
		(newSaved) => {
			//consola('normal','⚪️ FSGD - SET newSaved', newSaved.toString());
			setSaved(newSaved);
		},
		handleSaveGardenDetail,
	];
}
