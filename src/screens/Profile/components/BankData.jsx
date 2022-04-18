import React, { useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { updateUserTemporal, updateHasNotSavedChanges } from '../../../store/user/userAction';

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Input } from '@ui-kitten/components';
import { TitleSection } from '../../../components/Titles/Section'

//Icons
import { CornerRightDownIcon } from '../../../assets/icons/CornerRightDown'

//Hooks
import { useKeyboardSize } from "../../../hooks/useKeyboardSize"

// eslint-disable-next-line no-unused-vars
export const BankDataForm = ({ debug }) => {
    const dispatch = useDispatch()

    //const navigation = useNavigation();

    //Styles
    const gloStyles = useStyleSheet(globalStyles);
    const ownStyles = useStyleSheet(styles);

    //Store
    const user = useSelector(state => state.userReducer.user);

    //State
    const [values, setValues] = useState({
        cardNumber: user?.bankDetails?.cardNumber || "",
        cardExpiration: user?.bankDetails?.cardExpiration || "",
        cardHolder: user?.bankDetails?.cardHolder || ""
    })

    //Handle
    function handleChange(value, keyName) {
        setValues(prevValues => {
            return {
                ...prevValues,
                [keyName]: value
            }
        })
        const bankDetails = { ...values }
        bankDetails[keyName] = value.trim();
        console.log('bankDetails', bankDetails)
        dispatch(updateUserTemporal({ bankDetails }))
        dispatch(updateHasNotSavedChanges())
    }


    //Keyboard
    const [keyboardIsOpen] = useKeyboardSize()

    function hideKeyboard() {
        console.log("⌨️ HIDE Keyboard")
        Keyboard.dismiss()
    }

    const renderKeyboardIcon = (props) => (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            {keyboardIsOpen ? <CornerRightDownIcon {...props} /> : <></>}
        </TouchableWithoutFeedback>
    );

    return (
        <View style={{ ...ownStyles?.wrapper }}>
            <TitleSection icon={'credit-card-outline'} primaryText={'Datos bancarios'} secondaryText={''} />
            <View style={{ ...gloStyles?.inputs?.wrapper }}>
                <View style={{ ...gloStyles?.inputs?.row }}>
                    <Input
                        style={{ ...gloStyles?.inputs?.input }}
                        label='Número de la tarjeta'
                        placeholder='XXXX XXXX XXXX XXXX'
                        value={values?.cardNumber || ''}
                        accessoryRight={renderKeyboardIcon}
                        onChangeText={text => handleChange(text, "cardNumber")}
                    />

                    <Input
                        style={{ ...gloStyles?.inputs?.input }}
                        label='Fecha de expiración'
                        placeholder='XX/XX'
                        value={values?.cardExpiration || ''}
                        accessoryRight={renderKeyboardIcon}
                        onChangeText={text => handleChange(text, "cardExpiration")}
                    />
                </View>


                <View style={{ ...gloStyles?.inputs?.row }}>
                    <Input
                        style={{ ...gloStyles?.inputs?.input }}
                        label='Nombre y apellidos del titular'
                        placeholder='XXXX XXXXXX XXXXXX'
                        value={values?.cardHolder || user?.metadata?.fullname.toUpperCase()}
                        accessoryRight={renderKeyboardIcon}
                        onChangeText={text => handleChange(text, "cardHolder")}
                    />
                </View>
            </View>
        </View>
    )
};

BankDataForm.propTypes = {
    debug: PropTypes.bool.isRequired,
};

BankDataForm.defaultProps = {
    debug: Constants.manifest.extra.debug || false,
};