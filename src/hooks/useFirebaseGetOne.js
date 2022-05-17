import { useState, useEffect } from 'react';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Lodash
import { toLower, upperFirst } from 'lodash';

//Moment
import moment from 'moment';

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
									ITEMS[0]?.name || ITEMS[0]?.requestDate || ITEMS[0]?.type,
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

		const createData = async () => {
			try {
				if (auth().currentUser) {
					const now = moment();
					const ref = firestore().collection(collection).doc();
					const creationDateTime = now.format();
					const creationDate = now.format('DD/MM/YYYY');
					const creationTime = now.format('HH:mm');
					let entity = {};
					switch (entityIdentifier) {
						case 'gid':
							entity = {
								gid: ref.id,
								uid: auth()?.currentUser?.uid,
								name: 'Nuevo jardín',
								content: 'Descripción',
								creationDateTime,
								creationDate,
								creationTime,
								address: '',
								addressExtra: '',
								postalCode: '',
								province: '',
								town: '',
								details: [],
								imageCounter: 0,
								images: [],
							};
							break;
						default:
							break;
					}
					firestore()
						.collection(collection)
						.doc(ref.id)
						.set(entity)
						.then(() => {
							setResult(entity);
							setLoading(false);
						})
						.catch((error) => {
							setLoading(false);
							setError(error.message);
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

		if (entityValue !== 'new') {
			fetchData();
		} else {
			createData();
		}

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
