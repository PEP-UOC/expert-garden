//Store
import { useSelector, useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';
import { removeChangesToSave } from '../store/change/changeAction';
import consola from '../libs/myLogger';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseErrorCodeMap from '../common/firebaseErrorCodeMap';

export function useFirebaseSaveAllChanges(debug) {
	const dispatch = useDispatch();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Store
	const user = useSelector((state) => state.userReducer.user);
	const changesToSave = useSelector((state) => state.changeReducer.changesToSave);

	const saveChanges = async () => {
		//consola('normal', '🙋‍♂️ FISA - user');
		//consola('normal', user);
		consola('normal', '🚨 FISA - changesToSave');
		consola('normal', changesToSave);

		consola('normal', `🕳  FISA - Dispatch Loading START`);
		dispatch(setLoadingMessage(debug ? '🔧 Guardando' : 'Guardando'));

		//Metadata
		const name = changesToSave?.metadata?.name || user?.metadata?.name || '';
		const surnames = changesToSave?.metadata?.surnames || user?.metadata?.surnames || '';
		const fullname =
			changesToSave?.metadata?.fullname ||
			`${user?.metadata?.name} ${user?.metadata?.surnames}` ||
			'';
		const email = changesToSave?.metadata?.email || user?.metadata?.email || '';
		const phoneNumber = changesToSave?.metadata?.phoneNumber || user?.metadata?.phoneNumber || '';
		const gender = changesToSave?.metadata?.gender || user?.metadata?.gender || '';
		const postalCode = changesToSave?.metadata?.postalCode || user?.metadata?.postalCode || '';
		const province = changesToSave?.metadata?.province || user?.metadata?.province || '';
		const town = changesToSave?.metadata?.town || user?.metadata?.town || '';
		const cif = changesToSave?.metadata?.cif || user?.metadata?.cif || '';
		const hasWorkers =
			changesToSave?.metadata?.hasWorkers === false
				? false
				: changesToSave?.metadata?.hasWorkers || user?.metadata?.hasWorkers || false;
		const birthday = changesToSave?.metadata?.birthday || user?.metadata?.birthdayDateTime || '';
		const birthdayDateTime =
			changesToSave?.metadata?.birthdayDateTime || user?.metadata?.birthdayDateTime || '';
		const metadata = {
			...user.metadata,
			name,
			surnames,
			fullname,
			email,
			phoneNumber,
			gender,
			postalCode,
			province,
			town,
			cif,
			hasWorkers,
			birthday,
			birthdayDateTime,
		};

		//Bank details
		const cardNumber =
			changesToSave?.bankDetails?.cardNumber || user?.bankDetails?.cardNumber || '';
		const cardExpiration =
			changesToSave?.bankDetails?.cardExpiration || user?.bankDetails?.cardExpiration || '';
		const cardHolder =
			changesToSave?.bankDetails?.cardHolder ||
			user?.bankDetails?.cardHolder ||
			user.metadata.fullname ||
			'';
		const IBAN = changesToSave?.bankDetails?.IBAN || user?.bankDetails?.IBAN || '';
		const IBANHolder =
			changesToSave?.bankDetails?.IBANHolder ||
			user?.bankDetails?.IBANHolder ||
			user.metadata.fullname ||
			'';
		const bankDetails = {
			...user.bankDetails,
			cardNumber,
			cardExpiration,
			cardHolder,
			IBAN,
			IBANHolder,
		};

		//Gardens
		const gardens = changesToSave?.gardens || [];

		firestore()
			.collection('users')
			.doc(auth()?.currentUser?.uid)
			.update({
				metadata,
				bankDetails,
			})
			.then(() => {
				consola('normal', '🟢 FISA - user UPDATED');
				auth()
					.currentUser.updateProfile({
						displayName: fullname,
					})
					.then(() => {
						const gardensList = gardens.filter((garden) => garden?.gid && garden?.gid !== '');
						Promise.all(
							gardensList.map(async (garden) => {
								firestore().collection('gardens').doc(garden?.gid).update({
									name: garden?.name,
									description: garden?.description,
									address: garden?.address,
									addressExtra: garden?.addressExtra,
									postalCode: garden?.postalCode,
									province: garden?.province,
									town: garden?.town,
								});
							}),
						);
						consola('normal', '🟢 FISA - gardens UPDATED');
						consola('normal', `🕳  FISA - Dispatch Loading STOP`);
						dispatch(setLoadingMessage(false));
						dispatch(setErrorMessage(false));
						consola('normal', '🧹 FISA - Limpiando changesToSave');
						dispatch(removeChangesToSave());
					})
					.catch((error) => {
						console.error(error.message);
						consola('normal', `🕳  FISA - Dispatch Loading STOP`);
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
				consola('normal', `🕳  FISA - Dispatch Loading STOP`);
				dispatch(setLoadingMessage(false));
				dispatch(
					setErrorMessage(
						debug
							? `${firebaseErrorCodeMap(error.code)} || ${error.message}`
							: firebaseErrorCodeMap(error.code),
					),
				);
			});
	};

	return [saveChanges];
}
