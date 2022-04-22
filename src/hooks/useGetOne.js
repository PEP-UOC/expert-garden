import { useState, useEffect } from 'react';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function useGetOne(debug, collection, entityIdentifier, entityValue) {
	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//State
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState({});
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchData() {
			try {
				if (auth().currentUser) {
					firestore()
						.collection(collection)
						.where(entityIdentifier, '==', entityValue)
						.onSnapshot((item) => {
							const ITEMS = [];
							if (!item.empty) {
								item.forEach((item) => {
									ITEMS.push(item.data());
								});
							}
							setResult(ITEMS[0]);
							setLoading(false);
						});
				} else {
					setLoading(false);
					setError('Vuelva a iniciar sessión');
				}
			} catch (error) {
				setLoading(false);
				setError(error.message);
			}

			setLoading(false);
		}

		fetchData();
	}, [entityValue]);

	return {
		error,
		loading,
		result,
	};
}

export default useGetOne;
