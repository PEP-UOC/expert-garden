import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { DetailItem } from './DetailItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const DetailsEstimated = ({ debug, details, cid, sid, companyEstimations }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'layers-outline'} primaryText={'Detalles'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>

				{details && details?.map((detail, index) => {
					return (
						<DetailItem detail={detail} detailIndex={index} key={detail.sdid} cid={cid} sid={sid} prevEstimation={companyEstimations?.find(
							(est) => est.sdid === detail.sdid
						)?.price || ''} />
					)
				})}
			</View>
		</View>
	)
};

DetailsEstimated.propTypes = {
	debug: PropTypes.bool.isRequired,
	details: PropTypes.array.isRequired,
	cid: PropTypes.string.isRequired,
	sid: PropTypes.string.isRequired,
	companyEstimations: PropTypes.array.isRequired,
};

DetailsEstimated.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
