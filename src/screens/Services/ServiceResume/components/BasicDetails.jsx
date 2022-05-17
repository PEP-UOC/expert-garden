import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Store
import { useSelector } from 'react-redux'

//Styles
import { useStyleSheet, Text, Button } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { MomentItem } from './MomentItem'
import { TitleSection } from '../../../../components/Titles/Section'

//Icons
import { BookOpenIcon } from '../../../../assets/icons/BookOpen'

// eslint-disable-next-line no-unused-vars
export const BasicDetails = ({ debug, isConfirmed, isSomeEstimated, isAllEstimated, companyIsEstimated, isFinalized, isCanceled, requestDate, cancelationDate, confirmationDate, previousVisitDate, serviceDate, goToResume }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'clipboard-outline'} primaryText={'Información básica'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>
				{!isSomeEstimated && !isCanceled && user?.role !== 'business' && (
					<View style={{ ...ownStyles.badgeWaiting, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='hint'>
							Esperando presupuestos
						</Text>
					</View>
				)}

				{isConfirmed && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Confirmado
						</Text>
					</View>
				)}

				{!isConfirmed && isSomeEstimated && user?.role === 'client' && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Presupuestado parcialmente
						</Text>
					</View>
				)}

				{!isConfirmed && isAllEstimated && user?.role === 'client' && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Presupuestado por completo
						</Text>
					</View>
				)}

				{isCanceled && (
					<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Cancelado
						</Text>
					</View>
				)}

				{companyIsEstimated && user?.role === 'business' && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Presupuestado
						</Text>
						<Button
							style={{ ...ownStyles.iconButton }}
							appearance={'ghost'}
							accessoryRight={<BookOpenIcon fill={ownStyles.iconColor.fill} />}
							onPress={() => {
								goToResume()
							}}
						>
							Ver
						</Button>
					</View>
				)}

				{isFinalized && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Terminado
						</Text>
					</View>
				)}

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
	isConfirmed: PropTypes.bool,
	isSomeEstimated: PropTypes.bool,
	isAllEstimated: PropTypes.bool,
	companyIsEstimated: PropTypes.bool,
	isFinalized: PropTypes.bool,
	isCanceled: PropTypes.bool,
	requestDate: PropTypes.string,
	cancelationDate: PropTypes.string,
	confirmationDate: PropTypes.string,
	previousVisitDate: PropTypes.string,
	serviceDate: PropTypes.string,
	goToResume: PropTypes.func,
};

BasicDetails.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	isConfirmed: false,
	isSomeEstimated: false,
	isAllEstimated: false,
	companyIsEstimated: false,
	isFinalized: false,
	isCanceled: false,
	requestDate: '',
	cancelationDate: '',
	confirmationDate: '',
	previousVisitDate: '',
	serviceDate: '',
	goToResume: () => { },
};
