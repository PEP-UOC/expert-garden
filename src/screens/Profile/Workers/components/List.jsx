/* eslint-disable react/prop-types */
/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Store
import { useSelector } from 'react-redux'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Button, ListItem } from '@ui-kitten/components';
import { TitleSectionWithNavigation } from '../../../../components/Titles/SectionWithNavigation'

//Icons
import { ChevronRightIcon } from '../../../../assets/icons/ChevronRight'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const WorkersList = ({ debug, type, limit, showTitle, showLong }) => {

	const navigation = useNavigation();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//State
	const [workers, setWorkers] = useState([]);
	const [title, setTitle] = useState(undefined);
	const [longTitle, setLongTitle] = useState('');
	const [noItems, setNoItems] = useState(undefined);
	const [icon, setIcon] = useState('');

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				//CLIENT
				case 'all':
					setTitle('Empleados')
					setLongTitle('Todos los empleados')
					setNoItems('Todavía no has registrado ningún empleado')
					setIcon('people-outline')

					if (auth().currentUser) {
						firestore().collection("users")
							.where("metadata.cid", "==", user.metadata.cid)
							.where("role", "==", 'worker')
							.orderBy("metadata.name", "desc")
							.limit(limit)
							.onSnapshot(workers => {
								if (isMounted) {
									if (!workers.empty) {
										const WORKERS = [];
										if (isMounted) {
											workers.forEach(worker => {
												if (isMounted) {
													WORKERS.push(worker.data())
												}
											})
										}
										consola('normal', `🌳 WOLI - Empleados de la empresa uid: ${auth()?.currentUser?.uid} cid: ${user.metadata.cid} ${WORKERS.length}`)

										if (isMounted) {
											setWorkers(WORKERS)
										}
									}
								}
							})
					} else {
						if (isMounted) {
							setWorkers([])
						}
					}
					break;

				default:
					break;

			}
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	//Navigation
	const navigateWorkerResume = (uid) => {
		navigation.navigate('Profile', {
			screen: 'WorkersResumeScreen',
			params: { uid },
		});
	};

	const navigateServiceList = (type) => {
		navigation.navigate('Services', {
			screen: 'ServiceListScreen',
			params: { type },
		});
	};

	//List
	const RenderItem = ({ item }) => {
		return (
			<ListItem
				onPress={() => navigateWorkerResume(item.uid)}
				title={`${item.metadata.fullname}${!item.verified ? ' (Sin verificar)' : ''}`}
				description={item.metadata.phoneNumber ? `${item.metadata.email} / ${item.metadata.phoneNumber}` : `${item.metadata.email}`}
				accessoryRight={renderItemAccessory(item)}
				style={{ paddingRight: 0, marginRight: -5 }}
			/>
		)
	};

	RenderItem.propTypes = {
		item: PropTypes.object.isRequired,
	};

	const renderItemAccessory = (item) => (
		<>
			<Button onPress={() => navigateWorkerResume(item?.uid)}
				accessoryRight={ChevronRightIcon} size='giant' appearance='ghost' style={{ paddingRight: 0 }} />
		</>
	);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{showTitle && <TitleSectionWithNavigation icon={icon || ''} primaryText={showLong ? longTitle : title || ''} secondaryText={''} navTo={() => navigateServiceList(type)} />}

			{workers?.length
				? workers?.map((worker) => (
					<View key={worker.uid} style={{ ...ownStyles?.item }}>
						<RenderItem item={worker} />
					</View>
				))
				: <View key={`empty-${type}`} style={{ ...ownStyles?.item, paddingBottom: Device?.isPhone ? 0 : 24 }}>
					<ListItem
						title={noItems}
					/>
				</View>
			}
		</View>
	)
};

WorkersList.propTypes = {
	debug: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	showTitle: PropTypes.bool.isRequired,
	showLong: PropTypes.bool,
};

WorkersList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	limit: 3,
	showTitle: true,
	showLong: false,
};
