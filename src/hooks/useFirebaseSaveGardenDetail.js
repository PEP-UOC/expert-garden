import { useState } from 'react';

//Store
import { useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import 'firebase/compat/storage';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

export function useFirebaseSaveGardenDetail(debug) {
	const dispatch = useDispatch();

	//Firebase
	const firestore = firebase.firestore;

	const [saved, setSaved] = useState(false);

	const handleSaveGardenDetail = async (detailValues) => {
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		const valuesToSave = JSON.parse(JSON.stringify(detailValues));
		delete valuesToSave['gid'];

		console.log('🚨 FSGD - valuesToSave', valuesToSave);

		try {
			firestore()
				.collection('gardens')
				.doc(detailValues?.gid)
				.update({
					details: arrayUnion(valuesToSave),
				})
				.then(() => {})
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
			dispatch(setLoadingMessage(false));
		}
	};

	return [
		saved,
		(newSaved) => {
			//console.log('⚪️ FSGD - SET newSaved', newSaved.toString());
			setSaved(newSaved);
		},
		handleSaveGardenDetail,
	];
}
