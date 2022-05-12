import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet, Text } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { MomentItem } from './MomentItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const BasicDetails = ({ debug, hasBudgets, isFinalized, isCanceled, requestDate, cancelationDate, confirmationDate, previousVisitDate, serviceDate }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'clipboard-outline'} primaryText={'Información básica'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>

				{!hasBudgets ? (
					<View style={{ ...ownStyles.badgeWaiting, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='hint'>
							Esperando presupuestos
						</Text>
					</View>
				) : null}

				{isCanceled ? (
					<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Cancelado
						</Text>
					</View>
				) : null}

				{isFinalized ? (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Terminado
						</Text>
					</View>
				) : null}

				{requestDate ? (
					<MomentItem title={'Solicitado el:'} moment={requestDate} />
				) : null}

				{cancelationDate ? (
					<MomentItem title={'Cancelado el:'} moment={cancelationDate} />
				) : null}

				{confirmationDate ? (
					<MomentItem title={'Confirmado el:'} moment={confirmationDate} />
				) : null}

				{previousVisitDate ? (
					<MomentItem title={'Día de la visita previa:'} moment={previousVisitDate} />
				) : null}

				{serviceDate ? (
					<MomentItem title={'Día del servicio:'} moment={serviceDate} />
				) : null}
			</View>
		</View>
	)
};

BasicDetails.propTypes = {
	debug: PropTypes.bool.isRequired,
	hasBudgets: PropTypes.bool,
	isFinalized: PropTypes.bool,
	isCanceled: PropTypes.bool,
	requestDate: PropTypes.string,
	cancelationDate: PropTypes.string,
	confirmationDate: PropTypes.string,
	previousVisitDate: PropTypes.string,
	serviceDate: PropTypes.string,
};

BasicDetails.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	hasBudgets: false,
	isFinalized: false,
	isCanceled: false,
	requestDate: '',
	cancelationDate: '',
	confirmationDate: '',
	previousVisitDate: '',
	serviceDate: '',
};
