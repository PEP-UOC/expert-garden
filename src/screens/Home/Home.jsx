import React from 'react'

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import { globalStyles } from '../../styles/globalStyles'
import { styles } from './styles'

//Store
import { useSelector } from 'react-redux'

//Components
import { SafeAreaView } from 'react-native'
import { Text, Button, Divider, Layout, TopNavigation, List, ListItem } from '@ui-kitten/components';

//Icons
import { AddIcon } from '../../components/icons/Add'
import { ChevronRightIcon } from '../../components/icons/ChevronRight'

export const HomeScreen = ({ navigation }) => {
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
      <TopNavigation title='Inicio' alignment='center' />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <Text category='h1' style={gloStyles?.h1}>Redux Configurado Correctamente 👩‍🌾</Text>

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


      </Layout >
    </SafeAreaView>
  )
};