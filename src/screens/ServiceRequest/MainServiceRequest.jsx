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
import { addService } from '../../store/service/serviceAction';
import { setErrorMessage, setLoadingMessage, setLoggedIn } from '../../store/root/rootAction';
import { removeUser } from '../../store/user/userAction';

//Data
import mainServices from '../../data/mainServices.json'

//Components
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Divider, Layout, Text, Button, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

//Icons
import { AddIcon } from '../../assets/icons/Add'
import { BackIcon } from '../../assets/icons/Back'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const MainServiceRequestScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Styles
  const gloStyles = useStyleSheet(globalStyles);
  const ownStyles = useStyleSheet(styles);
  const fullStyles = { ...gloStyles, ...ownStyles };

  //Actions
  const submitService = (text) => dispatch(addService(text)) && navigation.navigate('Home');

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

    firebase.auth().signOut()
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
          <View style={{ ...fullStyles.view }}>
            <Button style={{ ...fullStyles?.button }} size='tiny' accessoryLeft={AddIcon} status='danger' appearance='outline' onPress={doLogout}>CERRAR SESIÓN</Button>
            <Text category='h1' style={{ ...fullStyles?.h1 }}>Solicitar un servicio</Text>

            {mainServices.map(service => {
              //console.log(service)
              return (<Button style={{ ...fullStyles?.button }}
                key={service.id} onPress={() => submitService(service.identifier)} >
                {service.label}
              </Button>)
            })}

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