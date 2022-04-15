import React, { useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage, setLoadingMessage } from '../../store/root/rootAction';

//Components
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SeparatorTop } from '../../components/Separators/Top'
import { TitleScreen } from '../../components/Titles/Screen'
import { BtnWithLogo } from '../../components/Buttons/WithLogo'
import { ServicesList } from './components/List'

//Icons
import { AddIcon } from '../../assets/icons/Add'

// eslint-disable-next-line no-unused-vars
export const ServicesScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Styles
  const gloStyles = useStyleSheet(globalStyles);

  //Store
  const user = useSelector(state => state.userReducer.user);

  //Navigation
  const navigateServiceRequest = () => {
    navigation.navigate('ServiceRequest');
  };

  useEffect(() => {
    dispatch(setLoadingMessage(false))
    dispatch(setErrorMessage(false))
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title={'Servicios'} alignment='center' />
      <Divider />
      <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
        contentContainerStyle={{ ...gloStyles.scrollView }}>
        <Layout style={{ ...gloStyles.layout }}>
          <SeparatorTop />
          <View style={{ ...gloStyles.view }}>
            <View style={{ ...gloStyles.section.primary }}>
              <TitleScreen icon={'car-outline'} primaryText={'Servicios'} secondaryText={''} />
              {
                {
                  'client': (
                    <BtnWithLogo icon={AddIcon} text={"SOLICITA UN SERVICIO"} onPress={navigateServiceRequest} />
                  ),
                  'business': (
                    <BtnWithLogo icon={AddIcon} text={"PRÓXIMOS SERVICIOS"} onPress={navigateServiceRequest} />
                  ),
                  'worker': (
                    <BtnWithLogo icon={AddIcon} text={"EMPEZAR A TRABAJAR"} onPress={navigateServiceRequest} />
                  )
                }[user?.metadata?.role]
              }
            </View>
            <View style={{ ...gloStyles.section.secondary }}>
              {
                {
                  'client': (
                    <>
                      <ServicesList type={'requested'} />
                      <ServicesList type={'inProgressPunctual'} />
                      <ServicesList type={'inProgressRecurrent'} />
                      <ServicesList type={'past'} />
                    </>
                  ),
                  'business': (
                    <ServicesList type={'requested'} />
                  ),
                  'worker': (
                    <ServicesList type={'requested'} />
                  )
                }[user?.metadata?.role]
              }
            </View>

          </View>
        </Layout >
      </ScrollView>
    </SafeAreaView>
  )
};

ServicesScreen.propTypes = {
  debug: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

ServicesScreen.defaultProps = {
  debug: Constants.manifest.extra.debug || false,
};