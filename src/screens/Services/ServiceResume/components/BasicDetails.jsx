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
export const BasicDetails = ({ debug, isConfirmed, isSomeEstimated, isAllEstimated, companyHasEstimationConfirmed, companyEstimationConfirmedDate, companyHasEstimationAccepted, companyEstimationAcceptedDate, companyHasEstimationRefused, companyEstimationRefusedDate, isFinalized, isCanceled, requestDate, cancelationDate, confirmationDate, previousVisitDate, serviceDate, goToResume }) => {

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

				{isConfirmed && !companyHasEstimationRefused && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Confirmado por el cliente
						</Text>
					</View>
				)}

				{!isConfirmed && isSomeEstimated && !isAllEstimated && user?.role === 'client' && (
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

				{companyHasEstimationConfirmed && user?.role === 'business' && (
					<>
						{companyHasEstimationAccepted
							? (<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
								<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
									Presupuesto aceptado
								</Text>
								<Button
									style={{ ...ownStyles.iconButton }}
									appearance={'ghost'}
									accessoryRight={<BookOpenIcon fill={ownStyles.iconColor.fill} />}
									onPress={() => {
										goToResume()
									}}
								>

								</Button>
							</View>)
							: companyHasEstimationRefused
								? (<View style={{ ...ownStyles.badgeRejected, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
									<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
										Presupuesto rechazado
									</Text>
									<Button
										style={{ ...ownStyles.iconButton }}
										appearance={'ghost'}
										accessoryRight={<BookOpenIcon fill={ownStyles.iconColor.fill} />}
										onPress={() => {
											goToResume()
										}}
									>
									</Button>
								</View>)
								: (<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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

									</Button>
								</View>)
						}
					</>

				)}

				{isFinalized && (
					<View style={{ ...ownStyles.badgeAccepted, width: '100%', marginBottom: 20 }}>
						<Text style={{ ...ownStyles.bigBadgeText }} appearance='alternative'>
							Terminado
						</Text>
					</View>
				)}

				{requestDate ? (
					<MomentItem title={'Solicitado:'} moment={requestDate} />
				) : null}

				{cancelationDate ? (
					<MomentItem title={'Cancelado:'} moment={cancelationDate} />
				) : null}

				{companyHasEstimationRefused && companyEstimationRefusedDate ? (
					<MomentItem title={'Rechazado:'} moment={companyEstimationRefusedDate} />
				) : null}

				{companyEstimationConfirmedDate ? (
					<MomentItem title={'Presupuestado:'} moment={companyEstimationConfirmedDate} />
				) : null}

				{!companyHasEstimationRefused && confirmationDate ? (
					<MomentItem title={'Confirmado:'} moment={confirmationDate} />
				) : null}

				{!companyHasEstimationRefused && previousVisitDate ? (
					<MomentItem title={'Día visita previa:'} moment={previousVisitDate} />
				) : null}

				{!companyHasEstimationRefused && serviceDate ? (
					<MomentItem title={'Día del servicio:'} moment={serviceDate} />
				) : null}
			</View>
		</View>
	)
};

BasicDetails.propTypes = {
	debug: PropTypes.bool.isRequired,
	isConfirmed: PropTypes.bool,
	isFinalized: PropTypes.bool,
	isCanceled: PropTypes.bool,
	isSomeEstimated: PropTypes.bool,
	isAllEstimated: PropTypes.bool,
	companyHasEstimationConfirmed: PropTypes.bool,
	companyEstimationConfirmedDate: PropTypes.any,
	companyHasEstimationAccepted: PropTypes.bool,
	companyEstimationAcceptedDate: PropTypes.any,
	companyHasEstimationRefused: PropTypes.bool,
	companyEstimationRefusedDate: PropTypes.any,
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
	isFinalized: false,
	isCanceled: false,
	isSomeEstimated: false,
	isAllEstimated: false,
	companyHasEstimationConfirmed: false,
	companyEstimationConfirmedDate: '',
	companyHasEstimationAccepted: false,
	companyEstimationAcceptedDate: '',
	companyHasEstimationRefused: false,
	companyEstimationRefusedDate: '',
	requestDate: '',
	cancelationDate: '',
	confirmationDate: '',
	previousVisitDate: '',
	serviceDate: '',
	goToResume: () => { },
};
