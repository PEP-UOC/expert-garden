import React from 'react';
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import { globalStyles } from '../../styles/globalStyles'
import { styles } from './styles'

//Store
import { useDispatch } from 'react-redux'
import { addService } from '../../store/serviceAction';

//Data
import mainServices from '../../data/mainServices.json'

//Components
import { SafeAreaView } from 'react-native'
import { Divider, Layout, Text, Button, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

//Icons
import { BackIcon } from '../../components/icons/Back'

// eslint-disable-next-line no-unused-vars
export const ServiceRequestScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Styles
  const gloStyles = useStyleSheet(globalStyles);
  const ownStyles = useStyleSheet(styles);

  //Actions
  const submitService = (text) => dispatch(addService(text)) && navigation.navigate('Home');

  //Navigation
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title={'Solicita un servicio'} alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <Text category='h1' style={gloStyles?.h1}>Solicitar un servicio</Text>

        {mainServices.map(service => {
          //console.log(service)
          return (<Button style={{ ...gloStyles?.button, ...ownStyles?.button }}
            key={service.id} onPress={() => submitService(service.identifier)} >
            {service.label}
          </Button>)
        })}

      </Layout>
    </SafeAreaView>
  )
};

ServiceRequestScreen.propTypes = {
  debug: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

ServiceRequestScreen.defaultProps = {
  debug: Constants.manifest.extra.debug || false,
};