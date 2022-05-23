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
