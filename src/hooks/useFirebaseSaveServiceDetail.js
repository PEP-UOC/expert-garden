import { useState, useEffect } from 'react';

//Store
import { useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';
import { addDetail, deleteDetail, resetServiceTemporal } from '../store/service/serviceAction';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { arrayUnion } from 'firebase/firestore';
import 'firebase/compat/storage';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

//Moment
import moment from 'moment';

export function useFirebaseSaveServiceDetail(debug) {
	const dispatch = useDispatch();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	const [saved, setSaved] = useState(false);

	const [isEdit, setIsEdit] = useState(false);
	const [itemToEdit, setItemToEdit] = useState(false);
	const [itemToUpdate, setItemToUpdate] = useState(false);
	const [originalItemToUpdate, setOriginalItemToUpdate] = useState(false);

	const handleRemoveServiceDetail = async (sdidToRemove) => {
		dispatch(deleteDetail(sdidToRemove));
	};

	const handleSaveServiceDetail = async (values, isEdit) => {
		console.log(`🕳  FSSD - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		const valuesToSave = JSON.parse(JSON.stringify(values));

		console.log('🚨 FSSD - valuesToSave', valuesToSave);

		switch (isEdit) {
			case false:
			default:
				try {
					dispatch(addDetail(valuesToSave));
					console.log(`🚧 FSSD - Service Detail ${values.sdid} guardado`);
					setItemToEdit(false);
					setItemToUpdate(false);
					setSaved(true);
					dispatch(setErrorMessage(false));
				} catch (error) {
					console.error(error.message);
					setSaved(false);
					dispatch(
						setErrorMessage(
							debug
								? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
								: firebaseErrorCodeMap(error.code),
						),
					);
				} finally {
					console.log(`🕳  FSSD - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
				}
				break;
		}
	};

	const handleSaveService = async (values, isEdit) => {
		console.log(`🕳  FSSD - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		const valuesToSave = JSON.parse(JSON.stringify(values));

		console.log('🚨 FSSD - valuesToSave', valuesToSave);

		switch (isEdit) {
			case true:
				try {
					let isMounted = true;
					if (auth().currentUser) {
						firestore()
							.collection('gardens')
							.doc(values.gid)
							.get()
							.then((doc) => {
								if (isMounted) {
									if (doc.exists) {
										var item = doc.data();
										setOriginalItemToUpdate(values);
										setItemToUpdate(valuesToSave);
										setItemToEdit(item);
									} else {
										console.log('🩸 FSSD - No such document!');
										setSaved(false);
										dispatch(setErrorMessage(`Error al actualizar el jardín.`));
									}
								}
							})
							.catch((error) => {
								console.error(error.message);
								console.log('🩸 FSSD - Error getting document.');
								setSaved(false);
								dispatch(setErrorMessage(`Error al actualizar el jardín.`));
							});
						//.where('gid', '==', values.gid)
						//.get()
						//.then((querySnapshot) => {
						//	if (isMounted) {
						//		const ITEMS = [];
						//		if (!querySnapshot.empty) {
						//			querySnapshot.forEach((item) => {
						//				ITEMS.push(item.data());
						//			});
						//		}
						//		setOriginalItemToUpdate(values);
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
					console.error(error.message);
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
					const needsDesign = false;
					const now = moment();
					const requestDateTime = now.format();
					const requestDate = now.format('DD-MM-YYYY');
					const requestTime = now.format('HH:mm');
					const ref = firestore().collection('services').doc();

					firestore()
						.collection('services')
						.doc(ref.id)
						.set({
							sid: ref.id,
							uid: auth()?.currentUser?.uid,
							requestDateTime,
							requestDate,
							requestTime,
							needsPreviousVisit: false,
							needsDesign,
							confirmationDateTime: null,
							confirmationDate: null,
							confirmationTime: null,
							serviceDateTime: null,
							serviceDate: null,
							serviceTime: null,
							isRecurrent: false,
							isFinalized: false,
							price: null,
							isPaid: false,
							cancelationDateTime: null,
							cancelationDate: null,
							cancelationTime: null,
							cancelationReason: null,
							details: valuesToSave.details,
						})
						.then(() => {
							console.log(`🚧 FSSD - Service ${ref.id} guardado`);
							setItemToEdit(false);
							setItemToUpdate(false);
							setSaved(ref.id);
							dispatch(setErrorMessage(false));
							//dispatch(resetServiceTemporal());
						})
						.catch((error) => {
							console.error(error.message);
							dispatch(
								setErrorMessage(
									debug
										? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
										: firebaseErrorCodeMap(error.code),
								),
							);
						});
				} catch (error) {
					console.error(error.message);
					setSaved(false);
					dispatch(
						setErrorMessage(
							debug
								? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
								: firebaseErrorCodeMap(error.code),
						),
					);
				} finally {
					console.log(`🕳  FSSD - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
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
							console.log(`🚧 FSSD - Garden Detail ${itemToUpdate.gdid} actualizado`);
							isMounted = false;
							setItemToEdit(false);
							setItemToUpdate(false);
							setSaved(true);
							dispatch(setErrorMessage(false));
						})
						.catch((error) => {
							console.error(error.message);
							console.log(`🕳  FSSD - Dispatch Loading STOP`);
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
					console.error(error.message);
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
			//console.log('⚪️ FSSD - SET newSaved', newSaved.toString());
			setSaved(newSaved);
		},
		handleRemoveServiceDetail,
		handleSaveServiceDetail,
		handleSaveService,
	];
}
