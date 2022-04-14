import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Store
import { useNavigation } from '@react-navigation/native';

//Components
import { Text, Button, List, ListItem } from '@ui-kitten/components';

//Icons
import { ChevronRightIcon } from '../../../assets/icons/ChevronRight'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const ServicesList = ({ debug, type }) => {

    const navigation = useNavigation();

    //Firebase
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);
    const fullStyles = { ...gloStyles, ...ownStyles };

    //Navigation
    const navigateServiceRequest = () => {
        navigation.navigate('ServiceRequest');
    };

    //List
    const renderItem = ({ item }) => {
        return (
            <ListItem
                onPress={navigateServiceRequest}
                title={`${item.text}`}
                description={`${item.uid}`}
                accessoryRight={renderItemAccessory}
            />
        )
    };
    const renderItemAccessory = () => (
        <Button onPress={navigateServiceRequest}
            accessoryRight={ChevronRightIcon} size='giant' appearance='ghost'></Button>
    );

    //State
    const [services, setServices] = useState([]);
    const [title, setTitle] = useState(undefined);

    useEffect(() => {
        switch (type) {
            case 'solicitados':
                setTitle('Servicios solicitados')
                break;
            default:
                setTitle(undefined)
                break;
        }

        if (auth().currentUser) {
            firestore().collection("services").where("uid", "==", auth().currentUser.uid)
                .onSnapshot(services => {
                    if (!services.empty) {
                        const SERVICES = [];
                        services.forEach(service => {
                            SERVICES.push(service.data())
                        })
                        console.log(`🌳 Servicios del usuario ${auth().currentUser.uid}`, SERVICES)
                        setServices(SERVICES)
                    }
                })
        } else {
            setServices([])
        }

    }, []);

    return (
        <>
            <Text category='h2' style={{ ...fullStyles?.h2 }}>{title}</Text>

            {services?.length ? <List
                style={{ ...fullStyles?.listContainer }}
                data={services}
                renderItem={renderItem}
            /> :
                <ListItem
                    title={'Todavía no has solicitado ningún servicio'}
                />
            }
        </>
    )
};

ServicesList.propTypes = {
    debug: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
};

ServicesList.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};