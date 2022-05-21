import { useState } from 'react';
import consola from '../libs/myLogger';

//Store
import { useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

//Moment
import moment from 'moment';

export function useExpoSendPush(debug) {
	const dispatch = useDispatch();

	//Firebase
	const firestore = firebase.firestore;

	const [sended, setSended] = useState(false);

	const sendPushNotification = async (to, uidSender, uidReceiver, title, body, data = {}) => {
		try {
			const now = moment();
			const sendDateTime = now.format();
			const sendDate = now.format('DD/MM/YYYY');
			const sendTime = now.format('HH:mm');
			const ref = firestore().collection('notifications').doc();

			const message = {
				to,
				sound: 'default',
				badge: 1,
				priority: 'high',
				title,
				body,
				data: { ...data, nid: ref.id },
			};

			await fetch('https://exp.host/--/api/v2/push/send', {
				mode: 'no-cors',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Accept-encoding': 'gzip, deflate',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(message),
			});

			consola('normal', `🚀 EXSP - Notification push enviada a ${to}`);

			firestore()
				.collection('notifications')
				.doc(ref.id)
				.set({
					nid: ref.id,
					sendDateTime,
					sendDate,
					sendTime,
					readDateTime: null,
					readDate: null,
					readTime: null,
					to,
					title,
					body,
					data,
					type: 'PUSH',
					uidSender,
					uidReceiver,
				})
				.then(() => {
					consola('normal', `🚧 EXSP - Notification ${ref.id} guardada`);
					setSended(true);
					dispatch(setErrorMessage(false));
				})
				.catch((error) => {
					consola('error', `🩸 ERROR - ${error.message}`);
					consola('normal', `🕳  EXSP - Dispatch Loading STOP`);
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
			setSended(false);
			dispatch(
				setErrorMessage(
					debug
						? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
						: firebaseErrorCodeMap(error.code),
				),
			);
		}
	};

	const updateUserPushToken = async (uid, pushToken, isBusiness) => {
		consola('normal', `🚀 EXSP - Push token (${pushToken}) actualizado para el usuario (${uid})`);

		try {
			if (pushToken) {
				firestore()
					.collection('users')
					.doc(uid)
					.update({
						pushToken,
					})
					.then(() => {
						if (isBusiness) {
							firestore()
								.collection('companies')
								.doc(isBusiness)
								.update({
									pushToken,
								})
								.then(() => {
									dispatch(setErrorMessage(false));
								})
								.catch((error) => {
									consola('error', `🩸 ERROR - ${error.message}`);
									consola('normal', `🕳  SNUP - Dispatch Loading STOP`);
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
					})
					.catch((error) => {
						consola('error', `🩸 ERROR - ${error.message}`);
						consola('normal', `🕳  SNUP - Dispatch Loading STOP`);
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
			setSended(false);
			dispatch(
				setErrorMessage(
					debug
						? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
						: firebaseErrorCodeMap(error.code),
				),
			);
		}
	};

	return { sended, sendPushNotification, updateUserPushToken };
}
