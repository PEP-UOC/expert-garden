import React, { useEffect, useState } from 'react'
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
import { Text, Button, Divider, Layout, TopNavigation, List, ListItem } from '@ui-kitten/components';
import { SeparatorTop } from '../../components/Separators/Top'
import { TitleScreen } from '../../components/Titles/Screen'
import { BtnWithLogo } from '../../components/Buttons/WithLogo'
import { EmailVerify } from './components/EmailVerify'

//Icons
import { AddIcon } from '../../assets/icons/Add'
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
  }, []);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  //Update user
  const [updateUserCounter, setUpdateUserCounter] = useState(1000);
  useEffect(() => {
    const timer =
      updateUserCounter > 0 && setInterval(() => {
        auth().onIdTokenChanged((updatedUser) => {
          if (updatedUser && updatedUser?.emailVerified) {
            console.log('🧶 Actualizando usuario')
            setUpdateUserCounter(0)
            dispatch(updateUser({ user: updatedUser }));
          }
        })
        auth()?.currentUser?.reload();
      }, 10000);
    return () => clearInterval(timer);
  }, [updateUserCounter]);

  const device = Device.isPhone ? '📱' : '💻';
  const role = user?.role === 'client' ? '🧔🏻‍♂️' : '💼';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title={debug ? `${device} Inicio ${role}` : 'Inicio'} alignment='center' />
      <Divider />
      <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
        contentContainerStyle={{ ...fullStyles.scrollView }}>
        <Layout style={{ ...fullStyles.layout }}>
          <SeparatorTop />
          <View style={{ ...fullStyles.view }}>
            <View style={{ ...fullStyles.section.primary }}>
              <TitleScreen primaryText={'Bienvenido'} secondaryText={user?.fullname || ''} />
              <EmailVerify user={user || {}} />
              {
                {
                  'client': (
                    <BtnWithLogo icon={AddIcon} text={"SOLICITA UN SERVICIO"} navigateTo={navigateServiceRequest} />
                  ),
                  'business': (
                    <BtnWithLogo icon={AddIcon} text={"SOLICITA UN SERVICIO"} navigateTo={navigateServiceRequest} />
                  ),
                  'worker': (
                    <BtnWithLogo icon={AddIcon} text={"SOLICITA UN SERVICIO"} navigateTo={navigateServiceRequest} />
                  )
                }[user?.role]
              }
            </View>
            <View style={{ ...fullStyles.section.secondary }}>
              {
                {
                  'client': (
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
                  ),
                  'business': <>
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
                  </>,
                  'worker': <>
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
                }[user?.role]
              }
            </View>

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