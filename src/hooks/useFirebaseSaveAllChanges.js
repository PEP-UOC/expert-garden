//Store
import { useSelector, useDispatch } from 'react-redux';
import { setErrorMessage, setLoadingMessage } from '../store/root/rootAction';
import { removeChangesToSave } from '../store/change/changeAction';

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
		//console.log('🙋‍♂️ FISA - user', user)
		console.log('🚨 FISA - changesToSave', changesToSave);

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
			birthday,
			birthdayDateTime,
		};

		//Bank details
		const cardNumber =
			changesToSave?.bankDetails?.cardNumber || user?.bankDetails?.cardNumber || '';
		const cardExpiration =
			changesToSave?.bankDetails?.cardExpiration || user?.bankDetails?.cardExpiration || '';
		const cardHolder =
			changesToSave?.bankDetails?.cardHolder || user?.bankDetails?.cardHolder || '';
		const bankDetails = {
			...user.bankDetails,
			cardNumber,
			cardExpiration,
			cardHolder,
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
				console.log('🟢 FISA - user UPDATED');
				auth()
					.currentUser.updateProfile({
						displayName: fullname,
					})
					.then(() => {
						const gardensList = gardens.filter((garden) => garden?.gid && garden?.gid !== '');
						Promise.all(
							gardensList.map(async (garden) => {
								firestore().collection('gardens').doc(garden?.gid).update({
									address: garden?.address,
									addressExtra: garden?.addressExtra,
									postalCode: garden?.postalCode,
									province: garden?.province,
									town: garden?.town,
								});
							}),
						);
						console.log('🟢 FISA - gardens UPDATED');
						dispatch(setLoadingMessage(false));
						dispatch(setErrorMessage(false));
						console.log('🧹 FISA - Limpiando changesToSave');
						dispatch(removeChangesToSave());
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
	};

	return [saveChanges];
}