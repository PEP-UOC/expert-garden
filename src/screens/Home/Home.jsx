import React from 'react'
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
import { useSelector } from 'react-redux'

//Components
import { SafeAreaView, View } from 'react-native'
import { Text, Button, Divider, Layout, TopNavigation, List, ListItem } from '@ui-kitten/components';

//Icons
import { AddIcon } from '../../components/icons/Add'
import { ChevronRightIcon } from '../../components/icons/ChevronRight'

// eslint-disable-next-line no-unused-vars
export const HomeScreen = ({ debug, navigation }) => {

  //Styles
  const gloStyles = useStyleSheet(globalStyles);
  const ownStyles = useStyleSheet(styles);

  //Store
  const services = useSelector(state => state.services);

  //Navigation
  const navigateServiceRequest = () => {
    navigation.navigate('ServiceRequest');
  };

  //List
  const renderItem = ({ item }) => {
    console.log('item', item)
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title={'Inicio'} alignment='center' />
      <Divider />
      <Layout style={{ ...gloStyles.layout }}>
        <View style={{ ...gloStyles.view }}>
          <Text category='h1' style={gloStyles?.h1}>Tipo de dispositivo {Device.isPhone ? '📱' : '💻'}</Text>

          <Button style={{ ...gloStyles?.button, ...ownStyles?.button }} size='large' onPress={navigateServiceRequest} accessoryLeft={AddIcon}>SOLICITA UN SERVICIO</Button>

          <Text category='h2' style={gloStyles?.h2}>Servicios solicitados</Text>

          {services.length ? <List
            style={ownStyles?.listContainer}
            data={services}
            renderItem={renderItem}
          /> :
            <ListItem
              title={'Todavía no has solicitado ningún servicio'}
            />
          }

        </View>
      </Layout >
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