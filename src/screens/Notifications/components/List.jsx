import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../libs/react-native-device-detection';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text, Button, ListItem } from '@ui-kitten/components';
import { TitleSection } from '../../../components/Titles/Section'

//Icons
import { RadioOnIcon } from '../../../assets/icons/RadioOn'
import { RadioOffIcon } from '../../../assets/icons/RadioOff'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//Moment
import moment from "moment";

// eslint-disable-next-line no-unused-vars
export const NotificationsList = ({ debug, type }) => {

    const navigation = useNavigation();

    //Firebase
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    //Styles
    //const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    //State
    const [notifications, setNotifications] = useState([]);
    const [title, setTitle] = useState(undefined);
    const [icon, setIcon] = useState('');

    useEffect(() => {
        switch (type) {
            case 'last':
                setTitle('Notificaciones')
                setIcon('bell-outline')

                if (auth().currentUser) {
                    firestore().collection("notifications").where("uidReceiver", "==", auth().currentUser.uid).orderBy("sendDateTime", "desc").limit(3)
                        .onSnapshot(notifications => {
                            if (!notifications.empty) {
                                const NOTIFICATIONS = [];
                                notifications.forEach(service => {
                                    NOTIFICATIONS.push(service.data())
                                })
                                console.log(`🐳 Notificaciones del usuario ${auth().currentUser.uid}`, NOTIFICATIONS)
                                setNotifications(NOTIFICATIONS)
                            }
                        })
                } else {
                    setNotifications([])
                }
                break;
            case 'new':
                setTitle('Nuevas')
                setIcon('radio-button-on-outline')

                if (auth().currentUser) {
                    firestore().collection("notifications").where("uidReceiver", "==", auth().currentUser.uid).where("readDateTime", "==", null).orderBy("sendDateTime", "desc").limit(3)
                        .onSnapshot(notifications => {
                            if (!notifications.empty) {
                                const NOTIFICATIONS = [];
                                notifications.forEach(service => {
                                    NOTIFICATIONS.push(service.data())
                                })
                                console.log(`🐳 Notificaciones nuevas del usuario ${auth().currentUser.uid}`, NOTIFICATIONS)
                                setNotifications(NOTIFICATIONS)
                            }
                        })
                } else {
                    setNotifications([])
                }
                break;
            case 'read':
                setTitle('Leídas')
                setIcon('radio-button-off-outline')

                if (auth().currentUser) {
                    firestore().collection("notifications").where("uidReceiver", "==", auth().currentUser.uid).where("readDateTime", "!=", null).orderBy("readDateTime", "desc").limit(3)
                        .onSnapshot(notifications => {
                            if (!notifications.empty) {
                                const NOTIFICATIONS = [];
                                notifications.forEach(service => {
                                    NOTIFICATIONS.push(service.data())
                                })
                                console.log(`🐳 Notificaciones leídas del usuario ${auth().currentUser.uid}`, NOTIFICATIONS)
                                setNotifications(NOTIFICATIONS)
                            }
                        })
                } else {
                    setNotifications([])
                }
                break;
            default:
                setTitle(undefined)
                break;
        }

    }, []);

    //Navigation
    const navigateServiceRequest = (nid) => {
        const now = moment();
        const readDateTime = now.format();
        const readDate = now.format("DD-MM-YYYY");
        const readTime = now.format("HH:mm");
        firestore().collection("notifications").doc(nid).update({
            readDateTime,
            readDate,
            readTime
        });
        navigation.navigate('ServiceRequest');
    };

    //List
    const RenderItem = ({ item }) => {
        return (
            <ListItem
                onPress={() => navigateServiceRequest(item?.nid)}
                title={`${item.type}`}
                description={`${item.content}`}
                accessoryRight={renderItemAccessory(item?.sendDateTime, item?.readDateTime)}
            />
        )
    };

    RenderItem.propTypes = {
        item: PropTypes.object.isRequired,
    };

    const renderItemAccessory = (sendDateTime, readDateTime) => {
        let momento = moment(sendDateTime).locale('es').calendar();
        momento = momento.charAt(0).toUpperCase() + momento.slice(1);
        return (
            <>
                {Device?.isPhone
                    ? null
                    : <Text category='p1' style={{ marginRight: 10 }}>{momento}</Text>
                }
                <Button onPress={navigateServiceRequest}
                    accessoryRight={readDateTime ? RadioOffIcon : RadioOnIcon} size='giant' appearance='ghost' />
            </>
        )
    };

    RenderItem.propTypes = {
        sendDateTime: PropTypes.string,
        readDateTime: PropTypes.string,
    };

    return (
        <View style={{ ...ownStyles?.wrapper }}>
            <TitleSection icon={icon || ''} primaryText={title || ''} secondaryText={''} />
            {notifications?.length
                ? notifications?.map((service) => (
                    <View key={service.nid} style={{ ...ownStyles?.item }}>
                        <RenderItem item={service} />
                    </View>
                ))
                : <View key={`empty-${type}`}>
                    <ListItem
                        title={'Todavía no has recibido ninguna notificación'}
                    />
                </View>
            }
        </View>
    )
};

NotificationsList.propTypes = {
    debug: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
};

NotificationsList.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};