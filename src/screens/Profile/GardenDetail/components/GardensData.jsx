import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'
import { List, ListItem } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'
import { GardenItem } from './Garden'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const GardensDataForm = ({ debug }) => {

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [gardens, setGardens] = useState([]);
	const [gardensLoading, setGardensLoading] = useState(false);

	useEffect(() => {
		if (auth().currentUser) {
			firestore().collection("gardens").where("uid", "==", auth().currentUser.uid)
				.onSnapshot(gardens => {
					setGardensLoading(true);
					const GARDENS = [];
					if (!gardens.empty) {
						gardens.forEach(service => {
							GARDENS.push(service.data())
						})
					}
					GARDENS.push({
						type: 'addGarden'
					})
					console.log(`🍀 Jardines del usuario ${auth().currentUser.uid}`, GARDENS.length - 1)
					setGardens(GARDENS)
					setGardensLoading(false);
				})
		} else {
			setGardens([])
		}

	}, []);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'sun-outline'} primaryText={'Mis jardines'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{gardens?.length && !gardensLoading
					? <List
						style={{ width: '100%' }}
						data={gardens}
						renderItem={(garden) => <GardenItem garden={garden} />}
						horizontal={true}
					/>
					: <ListItem
						title={'Todavía no has solicitado ningún servicio'}
					/>
				}
			</View>
		</View>
	)
};

GardensDataForm.propTypes = {
	debug: PropTypes.bool.isRequired,
};

GardensDataForm.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
