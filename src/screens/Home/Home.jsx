import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>!Proyecto Expert-Garden Configurado Correctamente 👩‍🌾!</Text>
      <Button
        title="Go to ServiceRequest"
        onPress={() => navigation.navigate('ServiceRequest')}
      />
    </Layout>
  )
};