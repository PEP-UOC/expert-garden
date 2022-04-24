import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../../store/root/rootAction';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Components
import { View } from 'react-native'
import { List, ListItem } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'
import { GardenItem } from './Garden'

//Hooks
import useFirebaseGetAll from '../../../../hooks/useFirebaseGetAll'

// eslint-disable-next-line no-unused-vars
export const GardensDataForm = ({ debug }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//Hooks
	const extraElement = { type: 'addGarden' };
	const { loading: gardensLoading, result: gardens, error: gardensError } = useFirebaseGetAll(debug, 'gardens', 'uid', user?.uid, extraElement);

	useEffect(() => {
		console.log(`🌀 GDAT - LOADING | ${gardensLoading.toString()}`)
	}, [gardensLoading]);

	useEffect(() => {
		if (gardens) {
			console.log(`🍀 GDAT - NEW GAR | ${gardens?.length || 0}`)
		}
	}, [gardens]);

	useEffect(() => {
		if (gardensError) {
			console.log(`🩸 GDAT - ERROR | ${gardensError}`)
			dispatch(setErrorMessage(gardensError))
		}
	}, [gardensError]);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'sun-outline'} primaryText={'Mis jardines'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{gardens?.length && !gardensLoading
					? <List
						data={gardens}
						horizontal={true}
						keyExtractor={(item) => item?.gid || item?.type}
						renderItem={(garden) => <GardenItem garden={garden} />}
						style={{ width: '100%' }}
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
