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
import { SeparatorTopScreen } from '../../components/Separators/TopScreen'
import { SeparatorTopSection } from '../../components/Separators/TopSection'
import { TitleScreen } from '../../components/Titles/Screen'
import { NotificationsList } from './components/List'

// eslint-disable-next-line no-unused-vars
export const NotificationsScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Styles
  const gloStyles = useStyleSheet(globalStyles);

  //Store
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(setLoadingMessage(false))
    dispatch(setErrorMessage(false))
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title={'Notificaciones'} alignment='center' />
      <Divider />
      <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
        contentContainerStyle={{ ...gloStyles.scrollView }}>
        <Layout style={{ ...gloStyles.layout }}>
          <SeparatorTopScreen />
          <View style={{ ...gloStyles.view }}>
            <View style={{ ...gloStyles.section.primary }}>
              <TitleScreen icon={'bell-outline'} primaryText={'Notificaciones'} secondaryText={''} />
            </View>
            <View style={{ ...gloStyles.section.secondary }}>
              <SeparatorTopSection />
              {
                {
                  'client': (
                    <>
                      <NotificationsList type={'new'} />
                      <NotificationsList type={'read'} />
                    </>
                  ),
                  'business': (
                    <NotificationsList type={'last'} />
                  ),
                  'worker': (
                    <NotificationsList type={'last'} />
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

NotificationsScreen.propTypes = {
  debug: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

NotificationsScreen.defaultProps = {
  debug: Constants.manifest.extra.debug || false,
};