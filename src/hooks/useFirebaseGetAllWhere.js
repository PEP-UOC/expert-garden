import { useState, useEffect } from 'react';
import consola from '../libs/myLogger';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Lodash
import { toLower, upperFirst } from 'lodash';

function useFirebaseGetAllWhere(debug, collection, entityIdentifier, entityValue, extraElement) {
	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//State
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				if (auth().currentUser) {
					firestore()
						.collection(collection)
						.where(entityIdentifier, '==', entityValue)
						.onSnapshot((list) => {
							if (isMounted) {
								setLoading(true);
								const ITEMS = [];
								if (!list.empty) {
									list.forEach((item) => {
										ITEMS.push(item.data());
									});
								}
								if (extraElement) {
									ITEMS.push(extraElement);
								}
								consola(
									'normal',
									`🌳 FIGAW - ${upperFirst(
										toLower(collection),
									)} ${entityIdentifier} ${entityValue} ${ITEMS.length}`,
								);
								setResult(ITEMS);
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

export default useFirebaseGetAllWhere;
