import { useState, useEffect } from 'react';
import consola from '../libs/myLogger';

//Store
import { useSelector, useDispatch } from 'react-redux';
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
import { useExpoSendPush } from './useExpoSendPush';

//Moment
import moment from 'moment';

export function useFirebaseServiceUtils(debug) {
	const dispatch = useDispatch();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Store
	const user = useSelector((state) => state.userReducer.user);

	//Send Push
	// eslint-disable-next-line no-unused-vars
	const { sended, sendPushNotification } = useExpoSendPush(debug);

	//State
	const [saved, setSaved] = useState(false);

	const [isEdit, setIsEdit] = useState(false);
	const [itemToEdit, setItemToEdit] = useState(false);
	const [originalItemToUpdate, setOriginalItemToUpdate] = useState(false);

	const handleRemoveServiceDetail = async (sdidToRemove) => {
		dispatch(deleteDetail(sdidToRemove));
	};

	const handleSaveServiceDetail = async (values, isEdit) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		const valuesToSave = JSON.parse(JSON.stringify(values));

		consola('normal', '🚨 FSUT - valuesToSave');
		consola('normal', valuesToSave);

		switch (isEdit) {
			case false:
			default:
				try {
					dispatch(addDetail(valuesToSave));
					consola('normal', `🚧 FSUT - Service Detail ${values.sdid} guardado`);
					setItemToEdit(false);
					setSaved(true);
					dispatch(setErrorMessage(false));
					consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
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
					consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
				}
				break;
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
								consola(
									'normal',
									`🚧 FSUT - Service Dates ${originalItemToUpdate.sid} actualizadas`,
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
								consola('error', `🩸 ERROR - ${error.message}`);
								consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
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
								consola(
									'normal',
									`🚧 FSUT - Service Companies ${originalItemToUpdate.sid} actualizadas`,
								);
								Promise.all(
									originalItemToUpdate.companies.map(async (company) => {
										await sendPushNotification(
											company.pushToken,
											auth()?.currentUser?.uid,
											company.uid,
											'¡Servicio solicitado!',
											`Accede para presupuestar el nuevo servicio solicitado`,
											{ sid: originalItemToUpdate?.sid },
										);
									}),
								);
								sendPushNotification(
									user?.pushToken,
									user?.uid,
									user?.uid,
									'¡Servicio solicitado!',
									`Has solicitado un nuevo servicio a ${originalItemToUpdate.companies.length} empresas`,
									{ sid: originalItemToUpdate?.sid },
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
								consola('error', `🩸 ERROR - ${error.message}`);
								consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
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
			updateData();
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};
	}, [itemToEdit]);

	const handleSaveService = async (values, isEdit) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		const valuesToSave = JSON.parse(JSON.stringify(values));

		consola('normal', '🚨 FSUT - valuesToSave');
		consola('normal', valuesToSave);

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
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								} else {
									consola('error', '🩸 FSUT - No such document!');
									setSaved(false);
									dispatch(setErrorMessage(`Error al actualizar el servicio.`));
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								}
							})
							.catch((error) => {
								consola('error', `🩸 ERROR - ${error.message}`);
								consola('error', '🩸 FSUT - Error getting document.');
								setSaved(false);
								dispatch(setErrorMessage(`Error al actualizar el servicio.`));
								consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
								dispatch(setLoadingMessage(false));
							});
					} else {
						dispatch(
							setErrorMessage(
								debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
							),
						);
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
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
					consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
				}
				break;

			case false:
			default:
				try {
					const needsDesign = false;
					const now = moment();
					const requestDateTime = now.format();
					const requestDate = now.format('DD/MM/YYYY');
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
							consola('normal', `🚧 FSUT - Service ${ref.id} guardado`);
							setItemToEdit(false);
							setSaved(ref.id);
							dispatch(setErrorMessage(false));
							dispatch(resetServiceTemporal());
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
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
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
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
					consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
					dispatch(setLoadingMessage(false));
				}
				break;
		}
	};

	const handleCancelService = async (sid) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Cancelando' : 'Cancelando'));

		setIsEdit(isEdit);

		consola('normal', `🚨 FSUT - Service toCancel ${sid}`);

		try {
			if (auth().currentUser) {
				const now = moment();
				const cancelationDateTime = now.format();
				const cancelationDate = now.format('DD/MM/YYYY');
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
						consola('normal', `🚧 FSUT - Service Cancelated ${sid}`);
						setItemToEdit(false);
						setSaved(true);
						dispatch(setErrorMessage(false));
						dispatch(resetServiceTemporal());
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
						dispatch(
							setErrorMessage(
								debug
									? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
									: firebaseErrorCodeMap(error.code),
							),
						);
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	const handleBusinessSelectServiceDate = async (sid, cid, did) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		consola('normal', `🚨 FSUT - Select service (${sid}) date (${did}) for business (${cid})`);

		try {
			if (auth().currentUser) {
				//const now = moment();
				//const cancelationDateTime = now.format();
				//const cancelationDate = now.format('DD/MM/YYYY');
				//const cancelationTime = now.format('HH:mm');

				firestore()
					.collection('services')
					.doc(sid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							var service = doc.data();
							const companyToEdit = service.companies.find((co) => co.cid === cid);
							companyToEdit.selectedDate = did;
							const companyToIndex = service.companies.findIndex((co) => co.cid === cid);
							const newDetail = { ...companyToEdit };
							const companiesArray = service.companies;
							companiesArray[companyToIndex] = newDetail;
							firestore()
								.collection('services')
								.doc(sid)
								.update({
									companies: companiesArray,
								})
								.then(() => {
									consola('normal', `🚧 FSUT - Company selected date ${did} actualizada`);
									setSaved(true);
									dispatch(setErrorMessage(false));
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
									dispatch(
										setErrorMessage(
											debug
												? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
												: firebaseErrorCodeMap(error.code),
										),
									);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								});
						} else {
							consola('error', '🩸 FSUT - No such document!');
							setSaved(false);
							dispatch(setErrorMessage(`Error al actualizar la fecha del servicio.`));
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
						}
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('error', '🩸 FSUT - Error getting document.');
						setSaved(false);
						dispatch(setErrorMessage(`Error al actualizar la fecha del servicio.`));
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	const handleBusinessEstimateServiceDetail = async (sid, cid, sdid, price) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		consola(
			'normal',
			`🚨 FSUT - Save service (${sid}) detail (${sdid}) price (${price}) for business (${cid})`,
		);

		try {
			if (auth().currentUser) {
				const now = moment();
				const estimationDateTime = now.format();
				const estimationDate = now.format('DD/MM/YYYY');
				const estimationTime = now.format('HH:mm');

				firestore()
					.collection('services')
					.doc(sid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							var service = doc.data();

							const companiesArray = service.companies;
							const companyToEdit = service.companies.find((co) => co.cid === cid);
							const companyToEditIndex = service.companies.findIndex((co) => co.cid === cid);

							const estimationsArray = companyToEdit.estimation || [];
							const prevEstimationDetail = estimationsArray.find((est) => est.sdid === sdid) || {};

							const prevEstimationDetailIndex = estimationsArray.findIndex(
								(est) => est.sdid === sdid,
							);
							const finalPrevEstimationDetailIndex =
								prevEstimationDetailIndex === -1
									? estimationsArray.length
									: prevEstimationDetailIndex;

							prevEstimationDetail.sdid = sdid;
							prevEstimationDetail.price = parseFloat(price);
							prevEstimationDetail.estimationDateTime = estimationDateTime;
							prevEstimationDetail.estimationDate = estimationDate;
							prevEstimationDetail.estimationTime = estimationTime;

							estimationsArray[finalPrevEstimationDetailIndex] = prevEstimationDetail;
							const newCompany = { ...companyToEdit, estimation: estimationsArray };
							companiesArray[companyToEditIndex] = newCompany;

							firestore()
								.collection('services')
								.doc(sid)
								.update({
									companies: companiesArray,
								})
								.then(() => {
									consola('normal', `🚧 FSUT - Service detail ${sdid} estimation actualizado`);
									setSaved(true);
									dispatch(setErrorMessage(false));
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
									dispatch(
										setErrorMessage(
											debug
												? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
												: firebaseErrorCodeMap(error.code),
										),
									);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								});
						} else {
							consola('error', '🩸 FSUT - No such document!');
							setSaved(false);
							dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
						}
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('error', '🩸 FSUT - Error getting document.');
						setSaved(false);
						dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	const handleConfirmServiceEstimation = async (sid, cid, price) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Confirmando' : 'Confirmando'));

		setIsEdit(isEdit);

		consola('normal', `🚨 FSUT - Confirm service (${sid}) estimation of company (${cid})`);

		try {
			if (auth().currentUser) {
				const now = moment();
				const estimationConfirmDateTime = now.format();
				const estimationConfirmDate = now.format('DD/MM/YYYY');
				const estimationConfirmTime = now.format('HH:mm');

				firestore()
					.collection('services')
					.doc(sid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							const service = doc.data();

							const companiesArray = service.companies;
							const companyToEdit = service.companies.find((co) => co.cid === cid);
							const companyToEditIndex = service.companies.findIndex((co) => co.cid === cid);
							const companyUid = companyToEdit.uid;

							const newCompany = {
								...companyToEdit,
								estimationTotalPrice: parseFloat(price),
								estimationDateTime: estimationConfirmDateTime,
								estimationDate: estimationConfirmDate,
								estimationTime: estimationConfirmTime,
								isEstimated: true,
							};
							companiesArray[companyToEditIndex] = newCompany;

							const companiesEstimationsList = service?.companiesEstimationsList || [];
							companiesEstimationsList.push(companyUid);

							firestore()
								.collection('services')
								.doc(sid)
								.update({
									companies: companiesArray,
									companiesEstimationsList: companiesEstimationsList,
								})
								.then(() => {
									firestore()
										.collection('users')
										.doc(service.uid)
										.get()
										.then((doc) => {
											if (doc.exists) {
												const requesterUser = doc.data();
												sendPushNotification(
													requesterUser.pushToken,
													auth()?.currentUser?.uid,
													requesterUser.uid,
													'¡Servicio presupuestado!',
													`${companyToEdit.name} ha presupuestado el servicio que solicitaste`,
													{ sid: service?.sid },
												).then(() => {
													consola('normal', `🚧 FSUT - Estimation service (${sid}) actualizada`);
													setSaved(true);
													dispatch(setErrorMessage(false));
													consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
													dispatch(setLoadingMessage(false));
												});
											}
										});
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
									dispatch(
										setErrorMessage(
											debug
												? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
												: firebaseErrorCodeMap(error.code),
										),
									);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								});
						} else {
							consola('error', '🩸 FSUT - No such document!');
							setSaved(false);
							dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
						}
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('error', '🩸 FSUT - Error getting document.');
						setSaved(false);
						dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	const handleAcceptServiceEstimation = async (sid, cid) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Aceptando' : 'Aceptando'));

		setIsEdit(isEdit);

		consola('normal', `🚨 FSUT - Accept estimation of company (${cid}) of service (${sid})`);

		try {
			if (auth().currentUser) {
				const now = moment();
				const confirmationDateTime = now.format();
				const confirmationDate = now.format('DD/MM/YYYY');
				const confirmationTime = now.format('HH:mm');

				firestore()
					.collection('services')
					.doc(sid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							const service = doc.data();

							let companiesArray = service.companies;
							companiesArray = companiesArray.map((co) => {
								if (co.isSelected) {
									return {
										...co,
										isSelected: co.cid === cid,
										isSelectedDateTime: confirmationDateTime,
										isSelectedDate: confirmationDate,
										isSelectedTime: confirmationTime,
										isRefused: co.cid !== cid,
									};
								}
								return {
									...co,
									isSelected: co.cid === cid,
									isRefused: co.cid !== cid,
									isRefusedDateTime: confirmationDateTime,
									isRefusedDate: confirmationDate,
									isRefusedTime: confirmationTime,
								};
							});

							const companySelected = companiesArray.find((co) => co.isSelected);

							const serviceDateSelected =
								service.dates.find((date) => date.did === companySelected.selectedDate) ||
								service.dates[0];

							firestore()
								.collection('services')
								.doc(sid)
								.update({
									companies: companiesArray,
									selectedCompany: companySelected.uid,
									confirmationDate: confirmationDate,
									confirmationTime: confirmationTime,
									confirmationDateTime: confirmationDateTime,
									serviceDid: serviceDateSelected.did,
									serviceDate: serviceDateSelected.date,
									serviceTime: serviceDateSelected.schedule,
									serviceDateTime: serviceDateSelected.dateTime,
									isConfirmed: true,
									price: companySelected?.estimation?.reduce((acc, cE) => cE.price + acc, 0),
								})
								.then(() => {
									const serviceDateSelected =
										service.dates.find((date) => date.did === companySelected.selectedDate) ||
										service.dates[0];

									Promise.all(
										companiesArray.map(async (company) => {
											let title;
											let msg;
											if (company.isSelected) {
												title = `¡Presupuesto aceptado!`;
												msg = `${auth()?.currentUser.displayName.trim()} ha aceptado el presupuesto del servicio que le ofreciste para el día ${
													serviceDateSelected.date
												}.`;

												consola(
													'normal',
													`🚧 FSUT - Estimation of company (${cid}) of service (${sid}) accepted`,
												);

												await sendPushNotification(
													user?.pushToken,
													user?.uid,
													user?.uid,
													`¡Servicio confirmado!`,
													`Has aceptado el presupuesto de la empresa ${company.name}`,
													{ sid: service?.sid },
												);
											} else {
												title = `¡Presupuesto rechazado!`;
												msg = `El cliente ha rechazado el presupuesto del servicio que le ofreciste.`;

												consola(
													'normal',
													`🚧 FSUT - Estimation of company (${cid}) of service (${sid}) rejected`,
												);
											}

											await sendPushNotification(
												company.pushToken,
												user?.uid,
												company.uid,
												title,
												msg,
												{ sid: service?.sid },
											);
										}),
									);

									setSaved(true);
									dispatch(setErrorMessage(false));
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
									dispatch(
										setErrorMessage(
											debug
												? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
												: firebaseErrorCodeMap(error.code),
										),
									);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								});
						} else {
							consola('error', '🩸 FSUT - No such document!');
							setSaved(false);
							dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
						}
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('error', '🩸 FSUT - Error getting document.');
						setSaved(false);
						dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	const handleRefuseServiceEstimation = async (sid, cid) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Rechazando' : 'Rechazando'));

		setIsEdit(isEdit);

		consola('normal', `🚨 FSUT - Refuse estimation of company (${cid}) of service (${sid})`);

		try {
			if (auth().currentUser) {
				const now = moment();
				const refuseDateTime = now.format();
				const refuseDate = now.format('DD/MM/YYYY');
				const refuseTime = now.format('HH:mm');

				firestore()
					.collection('services')
					.doc(sid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							const service = doc.data();

							let companiesArray = service.companies;
							const companyToEdit = service.companies.find((co) => co.cid === cid);
							const companyToEditIndex = service.companies.findIndex((co) => co.cid === cid);

							const newCompany = {
								...companyToEdit,
								isSelected: companyToEdit.cid !== cid,
								isRefused: companyToEdit.cid === cid,
								isRefusedDateTime: refuseDateTime,
								isRefusedDate: refuseDate,
								isRefusedTime: refuseTime,
							};

							companiesArray[companyToEditIndex] = newCompany;

							firestore()
								.collection('services')
								.doc(sid)
								.update({
									companies: companiesArray,
								})
								.then(() => {
									const title = `¡Presupuesto rechazado!`;
									const msg = `El cliente ha rechazado el presupuesto del servicio que le ofreciste.`;

									sendPushNotification(
										companyToEdit.pushToken,
										auth()?.currentUser?.uid,
										companyToEdit.uid,
										title,
										msg,
										{ sid: service?.sid },
									).then(() => {
										consola(
											'normal',
											`🚧 FSUT - Estimation of company (${cid}) of service (${sid}) rejected`,
										);

										setSaved(true);
										dispatch(setErrorMessage(false));
										consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
										dispatch(setLoadingMessage(false));
									});
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
									dispatch(
										setErrorMessage(
											debug
												? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
												: firebaseErrorCodeMap(error.code),
										),
									);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								});
						} else {
							consola('error', '🩸 FSUT - No such document!');
							setSaved(false);
							dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
						}
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('error', '🩸 FSUT - Error getting document.');
						setSaved(false);
						dispatch(setErrorMessage(`Error al actualizar la estimación del servicio.`));
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	const handleBusinessSelectServiceWorker = async (sid, uid) => {
		consola('normal', `🕳  FSUT - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		setIsEdit(isEdit);

		consola('normal', `🚨 FSUT - Select service (${sid}) worker (${uid})`);

		try {
			if (auth().currentUser) {
				firestore()
					.collection('services')
					.doc(sid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							firestore()
								.collection('services')
								.doc(sid)
								.update({
									asignedWorker: uid,
								})
								.then(() => {
									consola('normal', `🚧 FSUT - Company asigned worker ${uid} actualizad0`);
									setSaved(true);
									dispatch(setErrorMessage(false));
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
									dispatch(
										setErrorMessage(
											debug
												? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
												: firebaseErrorCodeMap(error.code),
										),
									);
									consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
									dispatch(setLoadingMessage(false));
								});
						} else {
							consola('error', '🩸 FSUT - No such document!');
							setSaved(false);
							dispatch(setErrorMessage(`Error al actualizar el trabajador del servicio.`));
							consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
							dispatch(setLoadingMessage(false));
						}
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('error', '🩸 FSUT - Error getting document.');
						setSaved(false);
						dispatch(setErrorMessage(`Error al actualizar el trabajador del servicio.`));
						consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
					});
			} else {
				dispatch(
					setErrorMessage(
						debug ? 'NO HAY SESIÓN. Vuelva a iniciar sessión' : 'Vuelva a iniciar sessión',
					),
				);
				consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
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
			consola('normal', `🕳  FSUT - Dispatch Loading STOP`);
			dispatch(setLoadingMessage(false));
		}
	};

	return {
		saved,
		setSaved: (newSaved) => {
			//consola('normal','⚪️ FSUT - SET newSaved', newSaved.toString());
			setSaved(newSaved);
		},
		handleRemoveServiceDetail,
		handleSaveServiceDetail,
		handleSaveService,
		handleCancelService,
		handleBusinessSelectServiceDate,
		handleBusinessEstimateServiceDetail,
		handleConfirmServiceEstimation,
		handleAcceptServiceEstimation,
		handleRefuseServiceEstimation,
		handleBusinessSelectServiceWorker,
	};
}
