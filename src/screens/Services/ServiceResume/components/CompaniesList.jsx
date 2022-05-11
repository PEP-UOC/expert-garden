import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { CompanyItem } from './CompanyItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const CompaniesList = ({ debug, companies }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'pantone-outline'} primaryText={'Presupuestos'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>

				{companies && companies?.map((company, index) => {
					return (
						<CompanyItem company={company} companyIndex={index} key={company.cid} />
					)
				})}
			</View>
		</View>
	)
};

CompaniesList.propTypes = {
	debug: PropTypes.bool.isRequired,
	companies: PropTypes.array.isRequired,
};

CompaniesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
