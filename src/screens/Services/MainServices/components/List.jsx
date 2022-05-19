/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text, Button, ListItem } from '@ui-kitten/components';
import { TitleSectionWithNavigation } from '../../../../components/Titles/SectionWithNavigation'

//Icons
import { ChevronRightIcon } from '../../../../assets/icons/ChevronRight'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//Data
import { servicesTypes } from '../../../../data/servicesTypes'

// eslint-disable-next-line no-unused-vars
export const ServicesList = ({ debug, type, limit, showTitle, showLong, cid }) => {

	const navigation = useNavigation();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [services, setServices] = useState([]);
	const [title, setTitle] = useState(undefined);
	const [longTitle, setLongTitle] = useState('');
	const [noItems, setNoItems] = useState(undefined);
	const [icon, setIcon] = useState('');

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				//CLIENT
				case 'requested':
					setTitle('Solicitados')
					setLongTitle('Servicios solicitados')
					setNoItems('Todavía no has solicitado ningún servicio')
					setIcon('inbox-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDate", "==", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("requestDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios solicitados del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'inProgress':
					setTitle('Próximos')
					setLongTitle('Próximos servicios')
					setNoItems('Todavía no tienes ningún servicio en curso')
					setIcon('play-circle-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Próximos servicios del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'inProgressPunctual':
					setTitle('Próximos puntuales')
					setLongTitle('Próximos servicios puntuales')
					setNoItems('Todavía no tienes ningún servicio puntual en curso')
					setIcon('checkmark-circle-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.where("isRecurrent", "==", false)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Próximos servicios puntuales del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'inProgressRecurrent':
					setTitle('Próximos recurrentes')
					setLongTitle('Próximos servicios recurrentes')
					setNoItems('Todavía no tienes ningún servicio recurrente en curso')
					setIcon('clock-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.where("isRecurrent", "==", true)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Próximos servicios recurrentes del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)
									setServices(SERVICES)
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'past':
					setTitle('Finalizados')
					setLongTitle('Servicios finalizados')
					setNoItems('Todavía no tienes ningún servicio finalizado')
					setIcon('shopping-bag-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("isFinalized", "==", true)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios anteriores del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'cancelated':
					setTitle('Cancelados')
					setLongTitle('Servicios cancelados')
					setNoItems('Todavía no tienes ningún servicio cancelado')
					setIcon('slash-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("cancelationDateTime", "!=", null)
							.where("isConfigured", "==", true)
							.orderBy("cancelationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios cancelados del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				//BUSINESS
				case 'received':
					setTitle('Recibidos')
					setLongTitle('Servicios recibidos')
					setNoItems('Todavía no has recibido ningún servicio')
					setIcon('inbox-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("companiesList", "array-contains", auth()?.currentUser?.uid)
							.where("confirmationDate", "==", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("requestDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios recibidos del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'notEstimated':
					setTitle('Por presupuestar')
					setLongTitle('Servicios esperando un presupuesto')
					setNoItems('Todavía no tienes ningún servicio por presupuestar')
					setIcon('inbox-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("companiesList", "array-contains", auth()?.currentUser?.uid)
							.where("confirmationDate", "==", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("requestDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										const serviceData = service.data()
										if (!serviceData?.companiesEstimationsList?.includes(auth()?.currentUser?.uid)) {
											SERVICES.push(serviceData)
										}
									})
									consola('normal', `🌳 SELI - Servicios recibidos del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'estimated':
					setTitle('Presupuestados')
					setLongTitle('Servicios presupuestados')
					setNoItems('Todavía no has presupuestado ningún servicio')
					setIcon('crop-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("companiesEstimationsList", "array-contains", auth()?.currentUser?.uid)
							.where("confirmationDate", "==", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("requestDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										const serviceData = service.data()
										SERVICES.push(serviceData)
									})
									consola('normal', `🌳 SELI - Servicios recibidos del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'refused':
					setTitle('Presupuestados rechazados')
					setLongTitle('Servicios presupuestados rechazados')
					setNoItems('Todavía no tienes ningún servicio rechazado')
					setIcon('close-circle-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("companiesEstimationsList", "array-contains", auth()?.currentUser?.uid)
							.where("isConfigured", "==", true)
							.where("selectedCompany", "!=", auth()?.currentUser?.uid)
							.orderBy("selectedCompany", "desc")
							.orderBy("requestDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										const serviceData = service.data()
										SERVICES.push(serviceData)
									})
									consola('normal', `🌳 SELI - Servicios con presupuesos rechazados del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'next':
					setTitle('Próximos')
					setLongTitle('Próximos servicios')
					setNoItems('Todavía no tienes ningún servicio próximo')
					setIcon('rewind-right-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("selectedCompany", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios futuros del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'nextPunctual':
					setTitle('Próximos puntuales')
					setLongTitle('Próximos servicios puntuales')
					setNoItems('Todavía no tienes ningún servicio próximo puntual')
					setIcon('checkmark-circle-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("selectedCompany", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.where("isRecurrent", "==", false)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios futuros puntuales del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'nextRecurrent':
					setTitle('Próximos recurrentes')
					setLongTitle('Próximos servicios recurrentes')
					setNoItems('Todavía no tienes ningún servicio próximo recurrente')
					setIcon('clock-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("selectedCompany", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.where("isRecurrent", "==", true)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios futuros recurrentes del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'pastBusiness':
					setTitle('Finalizados')
					setLongTitle('Servicios finalizados')
					setNoItems('Todavía no tienes ningún servicio finalizado')
					setIcon('shopping-bag-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("selectedCompany", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("isFinalized", "==", true)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios anteriores del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'cancelatedBusiness':
					setTitle('Cancelados')
					setLongTitle('Servicios cancelados')
					setNoItems('Todavía no tienes ningún servicio cancelado')
					setIcon('slash-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("selectedCompany", "==", auth()?.currentUser?.uid)
							.where("cancelationDateTime", "!=", null)
							.where("isConfigured", "==", true)
							.orderBy("cancelationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios cancelados del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				//WORKER
				case 'nextAsigned':
					setTitle('Próximos')
					setLongTitle('Próximos servicios')
					setNoItems('Todavía no tienes ningún servicio asignado')
					setIcon('rewind-right-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("asignedWorker", "==", auth()?.currentUser?.uid)
							.where("serviceDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("serviceDateTime", "asc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios futuros asignados del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				case 'pastAsigned':
					setTitle('Finalizados')
					setLongTitle('Servicios finalizados')
					setNoItems('Todavía no tienes ningún servicio finalizado')
					setIcon('shopping-bag-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("asignedWorker", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("isFinalized", "==", true)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									consola('normal', `🌳 SELI - Servicios finalizados del usuario ${auth()?.currentUser?.uid} ${SERVICES.length}`)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;

				default:
					break;

			}
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	//Navigation
	const navigateServiceResume = (sid) => {
		navigation.navigate('Services', {
			screen: 'ServiceResumeScreen',
			params: { sid },
		});
	};

	const navigateServiceList = (type) => {
		navigation.navigate('Services', {
			screen: 'ServiceListScreen',
			params: { type },
		});
	};

	//List
	const RenderItem = ({ item }) => {
		let title;
		let subTitle;
		//let detail;
		let company;

		if (cid) {
			company = item.companies.find(co => co.cid === cid)
		}

		title = item.details.reduce((acc, item) => {
			return `${acc}${servicesTypes.find((type) => type.identifier === item?.type)?.label} ${item?.type !== 'CREATE_GARDEN' ? '→ ' + servicesTypes.find((type) => type.identifier === item?.type)?.step1types.find((type) => type.identifier === item?.step1)?.label : ''} / `
		}, '')
		title = title.substring(0, title.length - 3)

		switch (type) {
			case 'requested':
				subTitle = `Solicitado el día ${item?.requestDate}`
				//detail = item?.requestDate
				break;
			case 'inProgress':
				subTitle = `Día del servicio ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			case 'inProgressPunctual':
				subTitle = `Día del servicio ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			case 'inProgressRecurrent':
				subTitle = `Día del servicio ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			case 'past':
			case 'pastBusiness':
			case 'pastAsigned':
				subTitle = `Realizado el día ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			case 'cancelated':
			case 'cancelatedBusiness':
				subTitle = `Cancelado el día ${item?.cancelationDate}`
				//detail = item?.cancelationDate
				break;
			case 'received':
				subTitle = `Recibido el día ${item?.requestDate}`
				//detail = item?.requestDate
				break;
			case 'notEstimated':
				subTitle = `Recibido el día ${item?.requestDate}`
				//detail = item?.requestDate
				break;
			case 'estimated':
				subTitle = `Presupuestado el día ${company?.estimationDate}`
				//detail = company?.estimationDate
				break;
			case 'refused':
				subTitle = `Rechazado el día ${company?.isRefusedDate}`
				//detail = company?.isRefusedDate
				break;
			case 'next':
			case 'nextAsigned':
				subTitle = `Día del servicio ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			case 'nextPunctual':
				subTitle = `Día del servicio ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			case 'nextRecurrent':
				subTitle = `Día del servicio ${item?.serviceDate}`
				//detail = item?.serviceDate
				break;
			default:
				break;
		}
		return (
			<ListItem
				onPress={() => navigateServiceResume(item.sid)}
				title={`${title}`}
				description={Device?.isPhone ? `${subTitle}` : ''}
				accessoryRight={renderItemAccessory(item, subTitle)}
				style={{ paddingRight: 0, marginRight: -5 }}
			/>
		)
	};

	RenderItem.propTypes = {
		item: PropTypes.object.isRequired,
	};

	const renderItemAccessory = (item, detail) => (
		<>
			{Device?.isPhone
				? null
				// eslint-disable-next-line react/prop-types
				: <Text category='p1' style={{ ...ownStyles.accessory }}>{detail}</Text>
			}
			<Button onPress={() => navigateServiceResume(item?.sid)}
				accessoryRight={ChevronRightIcon} size='giant' appearance='ghost' style={{ paddingRight: 0 }} />
		</>
	);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{showTitle && <TitleSectionWithNavigation icon={icon || ''} primaryText={showLong ? longTitle : title || ''} secondaryText={''} navTo={() => navigateServiceList(type)} />}

			{services?.length
				? services?.map((service) => (
					<View key={service.sid} style={{ ...ownStyles?.item }}>
						<RenderItem item={service} />
					</View>
				))
				: <View key={`empty-${type}`} style={{ ...ownStyles?.item, paddingBottom: Device?.isPhone ? 0 : 24 }}>
					<ListItem
						title={noItems}
					/>
				</View>
			}
		</View>
	)
};

ServicesList.propTypes = {
	debug: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	showTitle: PropTypes.bool.isRequired,
	showLong: PropTypes.bool,
	cid: PropTypes.string,
};

ServicesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	limit: 3,
	showTitle: true,
	showLong: false,
	cid: '',
};
