import { useState } from 'react';

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
		const message = {
			to,
			sound: 'default',
			title,
			body,
			data,
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

		console.log(`🚀 EXSP - Notification push enviada a ${to}`);

		try {
			const now = moment();
			const sendDateTime = now.format();
			const sendDate = now.format('DD-MM-YYYY');
			const sendTime = now.format('HH:mm');
			const ref = firestore().collection('notifications').doc();

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
					console.log(`🚧 EXSP - Notification ${ref.id} guardada`);
					setSended(true);
					dispatch(setErrorMessage(false));
				})
				.catch((error) => {
					console.error(error.message);
					console.log(`🕳  EXSP - Dispatch Loading STOP`);
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

	return [sended, sendPushNotification];
}
