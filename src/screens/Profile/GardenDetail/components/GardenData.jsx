import React, { useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useSelector, useDispatch } from 'react-redux'
import { updateUserTemporal, updateHasNotSavedChanges } from '../../../../store/user/userAction';

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Input, Select, SelectItem, IndexPath, Calendar, NativeDateService, Modal, Card } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Icons
import { CornerRightDownIcon } from '../../../../assets/icons/CornerRightDown'

//Moment
import moment from "moment";
import { i18n } from "../../../../styles/ui-kitten/calendarLocale"

//Hooks
import { useKeyboardSize } from "../../../../hooks/useKeyboardSize"

// eslint-disable-next-line no-unused-vars
export const GardenDataForm = ({ debug }) => {
	const dispatch = useDispatch()

	//const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Store
	const user = useSelector(state => state.userReducer.user);

	//State
	const [values, setValues] = useState({
		name: user?.metadata?.name || "",
		surnames: user?.metadata?.surnames || "",
		email: user?.metadata?.email || "",
		phoneNumber: user?.metadata?.phoneNumber || "",
		gender: user?.metadata?.gender || "",
		birthday: user?.metadata?.birthdayDateTime ? moment(user?.metadata?.birthdayDateTime).format("DD/MM/YYYY") : "",
		birthdayDateTime: user?.metadata?.birthdayDateTime || ""
	})

	//Handle
	function handleChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
		const metadata = { ...values }
		metadata[keyName] = value.trim();
		if (keyName === 'name') {
			metadata['fullname'] = `${value} ${values?.surnames}`;
		}
		if (keyName === 'surnames') {
			metadata['fullname'] = `${values?.name} ${value}`;
		}
		console.log('metadata', metadata)
		dispatch(updateUserTemporal({ metadata }))
		dispatch(updateHasNotSavedChanges())
	}


	const [calendarVisible, setCalendarVisible] = useState(false);
	const [birthdayDate, setBirthdayDate] = useState(values?.birthday
		? moment(values?.birthdayDateTime).toDate()
		: moment().subtract(18, 'years').toDate());

	function handleCalendar(value) {
		setBirthdayDate(value)
		handleChange(moment(value).format("DD/MM/YYYY"), "birthday")
		handleChange(moment(value).format(), "birthdayDateTime")
		setCalendarVisible(false)
	}
	const localeDateService = new NativeDateService('es', { i18n, startDayOfWeek: 1 });

	//Select Options
	const genderTypes = [
		{
			name: 'undefined',
			value: 'Sin determinar'
		},
		{
			name: 'male',
			value: 'Hombre'
		},
		{
			name: 'female',
			value: 'Mujer'
		},
	];

	//Select
	const [selectedIndex, setSelectedIndex] = useState(
		genderTypes.findIndex(genderType => genderType.name === user?.metadata?.gender) !== -1
			? new IndexPath(genderTypes.findIndex(genderType => genderType.name === user?.metadata?.gender))
			: new IndexPath(0));
	const displayValue = genderTypes[selectedIndex.row]?.value;
	const renderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	//Keyboard
	const [keyboardSize, keyboardIsOpen] = useKeyboardSize()

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
			<TitleSection icon={'person-outline'} primaryText={'Datos personales'} secondaryText={''} />
			<View style={{ ...gloStyles?.inputs?.wrapper }}>
				<View style={{ ...gloStyles?.inputs?.row }}>
					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Nombre'
						placeholder='Introduce tu nombre'
						value={values?.name || ''}
						accessoryRight={renderKeyboardIcon}
						onChangeText={text => handleChange(text, "name")}
					/>

					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Apellidos'
						placeholder='Introduce tus apellidos'
						value={values?.surnames || ''}
						accessoryRight={renderKeyboardIcon}
						onChangeText={text => handleChange(text, "surnames")}
					/>
				</View>


				<View style={{ ...gloStyles?.inputs?.row }}>
					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Correo electrónico'
						placeholder='Introduce tu correo electrónico'
						value={values?.email || ''}
						accessoryRight={renderKeyboardIcon}
						onChangeText={text => handleChange(text, "email")}
					/>

					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Número de teléfono'
						placeholder='Introduce tu número de teléfono'
						value={values?.phoneNumber || ''}
						accessoryRight={renderKeyboardIcon}
						onChangeText={text => handleChange(text, "phoneNumber")}
					/>
				</View>

				<View style={{ ...gloStyles?.inputs?.row }}>
					<Select
						style={{ ...gloStyles.inputs.select }}
						label='Género'
						value={displayValue}
						selectedIndex={selectedIndex}
						onSelect={index => {
							setSelectedIndex(index)
							handleChange(genderTypes[index - 1].name, "gender")
						}}>
						{genderTypes.map(gT => gT.value).map(renderOption)}
					</Select>

					<Input
						style={{ ...gloStyles?.inputs?.input }}
						label='Fecha de nacmiento'
						placeholder='xx/xx/xxxx'
						value={values?.birthday || ''}
						accessoryRight={renderKeyboardIcon}
						onFocus={() => { setCalendarVisible(true) }}
					/>
				</View>

				<Modal
					visible={calendarVisible}
					backdropStyle={{ ...gloStyles.modal.backdrop }}>
					<Card disabled={true}
						style={{ ...gloStyles.modal.card, marginBottom: keyboardSize }}>
						<View style={{ ...gloStyles.modal.view }}>
							<Calendar
								dateService={localeDateService}
								min={moment().subtract(99, 'years').toDate()}
								max={moment().subtract(18, 'years').toDate()}
								date={birthdayDate}
								onSelect={date => handleCalendar(date)}
							/>
						</View>
					</Card>
				</Modal>
			</View>
		</View>
	)
};

GardenDataForm.propTypes = {
	debug: PropTypes.bool.isRequired,
};

GardenDataForm.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
