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
import { updateUser } from '../../store/user/userAction';

//Components
import { SafeAreaView, ScrollView, View, Image } from 'react-native'
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SeparatorTop } from '../../components/Separators/Top'
import { TitleScreen } from '../../components/Titles/Screen'
import { PersonalDataForm } from './components/PersonalData'
import { BtnPrimary } from '../../components/Buttons/Primary'
import { ImgClient } from '../../components/Images/Client'

//Icons
import { AddIcon } from '../../assets/icons/Add'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import firebaseErrorCodeMap from '../../common/firebaseErrorCodeMap';

// eslint-disable-next-line no-unused-vars
export const ProfileScreen = ({ debug, navigation }) => {
  const dispatch = useDispatch()

  //Firebase
  const auth = firebase.auth;
  const firestore = firebase.firestore;

  //Styles
  const gloStyles = useStyleSheet(globalStyles);

  //Store
  const user = useSelector(state => state.userReducer.user);
  const hasNotSavedChanges = useSelector(state => state.userReducer.hasNotSavedChanges);

  const saveChanges = () => {
    console.log(user)
    firestore().collection("users").doc(auth().currentUser.uid).update({
      name: user?.metadata?.name,
      surnames: user?.metadata?.surnames,
      fullname: `${user?.metadata?.name} ${user?.metadata?.surnames}`,
      email: user?.metadata?.email,
      phoneNumber: user?.metadata?.phoneNumber,
      gender: user?.metadata?.gender,
      birthdayDateTime: user?.metadata?.birthdayDateTime,
    })
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: `${user?.metadata?.name} ${user?.metadata?.surnames}`,
        }).then(() => {
          auth().onAuthStateChanged((updatedUser) => {
            if (updatedUser) {
              dispatch(updateUser({ metadata: user?.metadata, user: updatedUser }))
              dispatch(setLoadingMessage(false))
              dispatch(setErrorMessage(false))
            }
          });

        }).catch((error) => {
          console.error(error.message);
          dispatch(setLoadingMessage(false))
          dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
        });
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(setLoadingMessage(false))
        dispatch(setErrorMessage(debug ? `${firebaseErrorCodeMap(error.code)} || ${error.message}` : firebaseErrorCodeMap(error.code)))
      });
  }

  useEffect(() => {
    dispatch(setLoadingMessage(false))
    dispatch(setErrorMessage(false))
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title={'Perfil'} alignment='center' />
      <Divider />
      <ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
        contentContainerStyle={{ ...gloStyles.scrollView }}>
        <Layout style={{ ...gloStyles.layout }}>
          <SeparatorTop />
          <View style={{ ...gloStyles.view }}>
            <View style={{ ...gloStyles.section.primary }}>
              <TitleScreen icon={'person-outline'} primaryText={user.metadata.name || ''} secondaryText={''} />
              <ImgClient uri={'https://reactjs.org/logo-og.png'} />
              {
                {
                  'client': (
                    <BtnPrimary disabled={!hasNotSavedChanges} icon={AddIcon} text={"GUARDAR"} onPress={saveChanges} />
                  ),
                  'business': (
                    <BtnPrimary disabled={!hasNotSavedChanges} icon={AddIcon} text={"GUARDAR"} onPress={saveChanges} />
                  ),
                  'worker': (
                    <BtnPrimary disabled={!hasNotSavedChanges} icon={AddIcon} text={"GUARDAR"} onPress={saveChanges} />
                  )
                }[user?.metadata?.role]
              }
            </View>
            <View style={{ ...gloStyles.section.secondary }}>
              {
                {
                  'client': (
                    <>
                      <PersonalDataForm />
                    </>
                  ),
                  'business': (
                    <>
                      <PersonalDataForm />
                    </>
                  ),
                  'worker': (
                    <>
                    </>
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

ProfileScreen.propTypes = {
  debug: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

ProfileScreen.defaultProps = {
  debug: Constants.manifest.extra.debug || false,
};