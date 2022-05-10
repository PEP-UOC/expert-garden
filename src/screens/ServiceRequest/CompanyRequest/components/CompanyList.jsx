import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'


//Store
import { useDispatch } from 'react-redux'
import { setLoadingMessage, setErrorMessage } from '../../../../store/root/rootAction';

//Components
import { View } from 'react-native'
import { TitleSection } from '../../../../components/Titles/Section'
import { CompanyItem } from './CompanyItem'

//Hooks
import useFirebaseGetAll from '../../../../hooks/useFirebaseGetAll'

// eslint-disable-next-line no-unused-vars
export const CompanyList = ({ debug }) => {
	const dispatch = useDispatch()

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Hooks
	const { loading: companiesLoading, result: companies, error: companiesError } = useFirebaseGetAll(debug, 'companies', 'cid', false);

	if (companiesError) {
		dispatch(setLoadingMessage(false))
		dispatch(setErrorMessage(companiesError))
	}

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'loader-outline'} primaryText={'Seleccionadas'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				{!companiesLoading && !companiesError && companies.length > 0 && companies?.map((company, index) => {
					return (
						<CompanyItem company={company} companyIndex={index} key={company.cid} />
					)
				})}
			</View>
		</View>
	)
};

CompanyList.propTypes = {
	debug: PropTypes.bool.isRequired,
};

CompanyList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
