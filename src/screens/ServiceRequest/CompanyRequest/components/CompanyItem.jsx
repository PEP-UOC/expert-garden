import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text } from '@ui-kitten/components';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// eslint-disable-next-line no-unused-vars
export const CompanyItem = ({ debug, company, companyIndex }) => {
	//Firebase
	const firestore = firebase.firestore;

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [values, setValues] = useState(company)

	useEffect(() => {
		firestore()
			.collection('users')
			.doc(values.uid)
			.get()
			.then((doc) => {
				const user = doc.data();
				setValues({ ...values, ...user })
			});
	}, []);

	return (
		<View style={{ ...ownStyles?.companyWrapper }}>
			<View style={{ ...gloStyles?.inputs?.row }}>
				<Text category='p1' style={{ ...ownStyles?.companyText }}>{values?.name}</Text>
				<Text category='c1' style={{ ...ownStyles?.companyText }}>{values?.metadata?.town} - {values?.metadata?.province}</Text>
			</View>
		</View>
	)
};

CompanyItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	company: PropTypes.object.isRequired,
	companyIndex: PropTypes.number.isRequired,
};

CompanyItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
