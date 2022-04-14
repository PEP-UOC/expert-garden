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
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SeparatorTop } from '../../components/Separators/Top'
import { TitleScreen } from '../../components/Titles/Screen'
import { BtnWithLogo } from '../../components/Buttons/WithLogo'
import { EmailVerify } from './components/EmailVerify'
import { ServicesList } from '../Services/components/List'

//Icons
import { AddIcon } from '../../assets/icons/Add'

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

  //Navigation
  const navigateServiceRequest = () => {
    navigation.navigate('ServiceRequest');
  };

  //Firebase
  const auth = firebase.auth;

  useEffect(() => {
    dispatch(setLoadingMessage(false))
    dispatch(setErrorMessage(false))
  }, []);

  useEffect(() => {
    console.log('👩‍🌾 Usuario', user.fullname, user.email);
  }, [user]);

  //Update user
  const [updateUserCounter, setUpdateUserCounter] = useState(1000);
  useEffect(() => {
    const timer =
      updateUserCounter > 0 && setInterval(() => {
        auth().onIdTokenChanged((updatedUser) => {
          if (updatedUser && updatedUser?.emailVerified) {
            setUpdateUserCounter(0)
            console.log('🧶 Actualizando usuario')
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
              <TitleScreen primaryText={'Bienvenido'} secondaryText={`${user?.fullname} 👩‍🌾` || ''} />
              <EmailVerify user={user || {}} />
              {
                {
                  'client': (
                    <BtnWithLogo icon={AddIcon} text={"SOLICITA UN SERVICIO"} navigateTo={navigateServiceRequest} />
                  ),
                  'business': (
                    <BtnWithLogo icon={AddIcon} text={"PRÓXIMOS SERVICIOS"} navigateTo={navigateServiceRequest} />
                  ),
                  'worker': (
                    <BtnWithLogo icon={AddIcon} text={"EMPEZAR A TRABAJAR"} navigateTo={navigateServiceRequest} />
                  )
                }[user?.role]
              }
            </View>
            <View style={{ ...fullStyles.section.secondary }}>
              {
                {
                  'client': (
                    <ServicesList type={'solicitados'} />
                  ),
                  'business': (
                    <ServicesList type={'solicitados'} />
                  ),
                  'worker': (
                    <ServicesList type={'solicitados'} />
                  )
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