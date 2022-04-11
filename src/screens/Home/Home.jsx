import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Device Detect
import Device from '../../libs/react-native-device-detection'

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';
import { updateUser } from '../../store/user/userAction';

//Components
import { SafeAreaView, ScrollView, LogBox, View } from 'react-native'
import { Text, Button, Divider, Layout, TopNavigation, List, ListItem, Card } from '@ui-kitten/components';

//Icons
import { AddIcon } from '../../assets/icons/Add'
import { PaperPlaneIcon } from '../../assets/icons/PaperPlane'
import { ChevronRightIcon } from '../../assets/icons/ChevronRight'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

// eslint-disable-next-line no-unused-vars
export const HomeScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Disable Warning. Ocurre cuando hay List dentro de ScrollView.
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  //Styles
  const gloStyles = useStyleSheet(globalStyles);
  const ownStyles = useStyleSheet(styles);
  const fullStyles = { ...gloStyles, ...ownStyles };

  //Store
  const user = useSelector(state => state.userReducer.user);
  const services = useSelector(state => state.serviceReducer.services);

  //Navigation
  const navigateServiceRequest = () => {
    navigation.navigate('ServiceRequest');
  };

  //Firebase
  const auth = firebase.auth;

  //Email verification
  const resendEmail = (auth) => {
    auth().currentUser.sendEmailVerification()
  };

  //List
  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={navigateServiceRequest}
        title={`${item.id}`}
        description={`${item.service}`}
        accessoryRight={renderItemAccessory}
      />
    )
  };
  const renderItemAccessory = () => (
    <Button onPress={navigateServiceRequest}
      accessoryRight={ChevronRightIcon} size='giant' appearance='ghost'></Button>
  );

  useEffect(() => {
    dispatch(setLoadingMessage(false))
    dispatch(setErrorMessage(false))
    //console.log('user', user)

    firebase?.auth().onAuthStateChanged((updatedUser) => {
      if (updatedUser != null) {
        console.log('updateUser', updatedUser);
        dispatch(updateUser({ user: updatedUser }));
      } else {
        console.log('NO USER');
      }
    });
  }, []);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  const device = Device.isPhone ? '📱' : '💻';
  const role = user?.role === 'client' ? '🧔🏻‍♂️' : '💼';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title={debug ? `${device} Inicio ${role}` : 'Inicio'} alignment='center' />
      <Divider />
      <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
        contentContainerStyle={{ ...fullStyles.scrollView }}>
        <Layout style={{ ...fullStyles.layout }}>
          <View style={{ ...fullStyles.view }}>
            <Text category='h1' style={{ ...fullStyles?.h1 }}>Bienvenido</Text>
            <Text category='h2' style={{ ...fullStyles?.h2 }}>{user?.fullname || ''}</Text>

            {user && !user?.user?.emailVerified && (
              <Card style={{ ...fullStyles?.card }} status='danger'>
                {user?.additionalUserInfo?.isNewUser ?
                  (
                    <>
                      <Text category='p1' style={{ ...fullStyles?.textCenter }} >!Gracias por registrarte!</Text>
                      <Text category='p1' style={{ ...fullStyles?.textCenter }} >Ahora necesitamos verificar tu email: {user.user.email}</Text>
                    </>
                  ) : (
                    <Text category='p1' style={{ ...fullStyles?.textCenter }}>Verifica tu email: {user.user.email}</Text>
                  )}
                <Button style={{ ...fullStyles?.button?.verifyEmail }} appearance='ghost' size='large' onPress={() => resendEmail(auth)} accessoryLeft={PaperPlaneIcon}>Reenviar email</Button>
              </Card>
            )}

            {user && user?.role === 'client' ? (
              <>
                <Button style={{ ...fullStyles?.button }} size='large' onPress={navigateServiceRequest} accessoryLeft={AddIcon}>SOLICITA UN SERVICIO</Button>
                <Text category='h2' style={{ ...fullStyles?.h2 }}>Servicios solicitados</Text>

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
            ) : user && user?.role === 'business' ? (
              <>
                <Text category='h2' style={{ ...fullStyles?.h2 }}>Servicios solicitados</Text>

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
            ) : user && user?.role === 'worker' ? (
              <>
                <Text category='h2' style={{ ...fullStyles?.h2 }}>Servicios solicitados</Text>

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
            ) : null}

          </View>
        </Layout >
      </ScrollView>
    </SafeAreaView>
  )
};

HomeScreen.propTypes = {
  debug: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

HomeScreen.defaultProps = {
  debug: Constants.manifest.extra.debug || false,
};