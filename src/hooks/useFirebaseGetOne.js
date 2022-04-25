import { useState, useEffect } from 'react';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Lodash
import { toLower, upperFirst } from 'lodash';

function useFirebaseGetOne(debug, collection, entityIdentifier, entityValue) {
	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//State
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState({});
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				if (auth().currentUser) {
					firestore()
						.collection(collection)
						.where(entityIdentifier, '==', entityValue)
						.onSnapshot((item) => {
							if (isMounted) {
								setLoading(true);
								const ITEMS = [];
								if (!item.empty) {
									item.forEach((item) => {
										ITEMS.push(item.data());
									});
								}
								console.log(
									`🌳 FIGO - ${upperFirst(
										toLower(collection.slice(0, -1)),
									)} ${entityIdentifier} ${entityValue} |`,
									ITEMS[0]?.type,
								);
								setResult(ITEMS[0]);
								setLoading(false);
							}
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
		};

		fetchData();
		return () => {
			// cancel the subscription
			isMounted = false;
		};
	}, [entityValue]);

	return {
		loading,
		result,
		error,
	};
}

export default useFirebaseGetOne;
