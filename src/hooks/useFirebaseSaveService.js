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

//Expo Push
import { useExpoSendPush } from '../hooks/useExpoSendPush';

//Moment
import moment from 'moment';

export function useFirebaseSaveService(debug) {
	const dispatch = useDispatch();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Send Push
	// eslint-disable-next-line no-unused-vars
	const [sended, sendPushNotification] = useExpoSendPush(debug);

	//State
	const [saved, setSaved] = useState(false);

	const [isEdit, setIsEdit] = useState(false);
	const [itemToEdit, setItemToEdit] = useState(false);
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
					if (auth().currentUser) {
						firestore()
							.collection('services')
							.doc(values.sid)
							.get()
							.then((doc) => {
								if (doc.exists) {
									var item = doc.data();
									setOriginalItemToUpdate(values);
									setItemToEdit(item);
								} else {
									console.log('🩸 FSSD - No such document!');
									setSaved(false);
									dispatch(setErrorMessage(`Error al actualizar el servicio.`));
								}
							})
							.catch((error) => {
								console.error(error.message);
								console.log('🩸 FSSD - Error getting document.');
								setSaved(false);
								dispatch(setErrorMessage(`Error al actualizar el servicio.`));
							});
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
				} finally {
					console.log(`🕳  FSSD - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
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
							isConfigured: false,
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
							setSaved(ref.id);
							dispatch(setErrorMessage(false));
							dispatch(resetServiceTemporal());
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

	const handleCancelService = async (sid) => {
		console.log(`🕳  FSSD - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Cancelando' : 'Cancelando'));

		setIsEdit(isEdit);

		console.log('🚨 FSSD - Service toCancel', sid);

		try {
			if (auth().currentUser) {
				const now = moment();
				const cancelationDateTime = now.format();
				const cancelationDate = now.format('DD-MM-YYYY');
				const cancelationTime = now.format('HH:mm');

				firestore()
					.collection('services')
					.doc(sid)
					.update({
						cancelationDateTime,
						cancelationDate,
						cancelationTime,
					})
					.then(() => {
						console.log(`🚧 FSSD - Service Cancelated ${sid}`);
						setItemToEdit(false);
						setSaved(true);
						dispatch(setErrorMessage(false));
						dispatch(resetServiceTemporal());
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
		} finally {
			console.log(`🕳  FSSD - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	useEffect(() => {
		let isMounted = true;
		const updateData = async () => {
			if (isMounted) {
				try {
					if (originalItemToUpdate?.what === 'dates') {
						firestore()
							.collection('services')
							.doc(originalItemToUpdate?.sid)
							.update({
								dates: originalItemToUpdate.dates,
							})
							.then(() => {
								console.log(`🚧 FSSD - Service Dates ${originalItemToUpdate.sid} actualizadas`);
								if (isMounted) {
									setItemToEdit(false);
									setSaved(true);
									dispatch(setErrorMessage(false));
									isMounted = false;
									dispatch(resetServiceTemporal());
								}
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
					} else if (originalItemToUpdate?.what === 'companies') {
						const companiesList = originalItemToUpdate.companies.map((co) => co.uid);
						firestore()
							.collection('services')
							.doc(originalItemToUpdate?.sid)
							.update({
								companies: originalItemToUpdate.companies,
								companiesList,
								isConfigured: true,
							})
							.then(() => {
								console.log(`🚧 FSSD - Service Companies ${originalItemToUpdate.sid} actualizadas`);
								Promise.all(
									originalItemToUpdate.companies.map(async (company) => {
										await sendPushNotification(
											company.pushToken,
											auth()?.currentUser?.uid,
											company.uid,
											'Servicio solicitado!',
											`Accede para presupuestar el servicio ${company.name}`,
											{ sid: originalItemToUpdate?.sid },
										);
									}),
								);
								if (isMounted) {
									setItemToEdit(false);
									setSaved(true);
									dispatch(setErrorMessage(false));
									isMounted = false;
									dispatch(resetServiceTemporal());
								}
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
			}
		};

		if (isEdit && itemToEdit) {
			updateData();
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
		handleCancelService,
	];
}
