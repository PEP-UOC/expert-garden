import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Store
import { useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage, setLoggedIn } from '../../store/root/rootAction';
import { removeUser } from '../../store/user/userAction';

//Data
import mainServices from '../../data/mainServices.json'

//Components
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Divider, Layout, Button, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { TitleScreen } from '../../components/Titles/Screen'
import { SeparatorTop } from '../../components/Separators/Top'

//Icons
import { AddIcon } from '../../assets/icons/Add'
import { BackIcon } from '../../assets/icons/Back'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

// eslint-disable-next-line no-unused-vars
export const MainServiceRequestScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Firebase
  const auth = firebase.auth;
  const firestore = firebase.firestore;

  //Styles
  const gloStyles = useStyleSheet(globalStyles);
  const ownStyles = useStyleSheet(styles);
  const fullStyles = { ...gloStyles, ...ownStyles };

  //Actions
  const submitService = (type, text) => {
    const ref = firestore().collection("services").doc();
    firestore().collection("services").doc(ref.id).set({
      sid: ref.id,
      uid: auth().currentUser.uid,
      type,
      text
    })
      .then(() => {
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(setLoggedIn(false))
        dispatch(setLoadingMessage(false))
        dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
      });
  };

  //Navigation
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  //Logout
  const doLogout = () => {

    dispatch(setLoadingMessage(debug ? '🔧 Adiós!' : 'Adiós!'))

    auth().signOut()
      .then(() => {
        console.info('Logged Out!');
        dispatch(removeUser())
        dispatch(setLoggedIn(false))
        dispatch(setLoadingMessage(false))
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(setLoggedIn(false))
        dispatch(setLoadingMessage(false))
      });
  };


  useEffect(() => {
    dispatch(setLoadingMessage(false))
    dispatch(setErrorMessage(false))
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title={'Solicita un servicio'} alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
        contentContainerStyle={{ ...fullStyles.scrollView }}>
        <Layout style={{ ...fullStyles.layout }}>
          <SeparatorTop />
          <View style={{ ...fullStyles.view }}>
            <View style={{ ...fullStyles.section.primary }}>
              <TitleScreen primaryText={'Solicita un servicio'} secondaryText={''} />
              <Button style={{ ...fullStyles?.button }} size='tiny' accessoryLeft={AddIcon} status='danger' appearance='outline' onPress={doLogout}>CERRAR SESIÓN</Button>
            </View>
            <View style={{ ...fullStyles.section.secondary }}>
              {mainServices.map(service => {
                //console.log(service)
                return (<Button style={{ ...fullStyles?.button, ...fullStyles?._button }}
                  key={service.id} onPress={() => submitService(service.identifier, `Test ${Math.random() * (1000 - 1) + 1}`)} >
                  {service.label}
                </Button>)
              })}
            </View>
          </View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
};

MainServiceRequestScreen.propTypes = {
  debug: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

MainServiceRequestScreen.defaultProps = {
  debug: Constants.manifest.extra.debug || false,
};