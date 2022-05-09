import React, { useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Store
import { useDispatch } from 'react-redux'
import { updateDate } from '../../../../store/service/serviceAction';

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Input, Select, SelectItem, IndexPath, Calendar, NativeDateService, Modal, Card } from '@ui-kitten/components';

//Moment
import moment from "moment";
import { i18n } from "../../../../styles/ui-kitten/calendarLocale"

//Hooks
import { useKeyboardSize } from "../../../../hooks/useKeyboardSize"

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

// eslint-disable-next-line no-unused-vars
export const DateItem = ({ debug, date, dateIndex }) => {
	const dispatch = useDispatch()

	//const navigation = useNavigation();

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [values, setValues] = useState(date)

	//Handle
	function handleChange(value, keyName) {
		setValues(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
		const newDate = { ...values }
		newDate[keyName] = value;
		console.log('📜 DAIT - newDate', newDate)

		dispatch(updateDate(newDate, dateIndex))
	}

	//Keyboard
	const [keyboardSize] = useKeyboardSize()

	const [calendarVisible, setCalendarVisible] = useState(false);
	const [dateDate, setDateDate] = useState(values?.birthday
		? moment(values?.dateTime).toDate()
		: moment().toDate());

	function handleCalendar(value) {
		setDateDate(value)
		handleChange(moment(value).format("DD/MM/YYYY"), "date")
		handleChange(moment(value).format(), "dateTime")
		setCalendarVisible(false)
	}
	const localeDateService = new NativeDateService('es', { i18n, startDayOfWeek: 1 });

	//Select Options
	const momentTypes = [
		{
			name: 'MORNING',
			value: 'Mañana'
		},
		{
			name: 'EVENING',
			value: 'Tarde'
		},
		{
			name: 'ALL_DAY',
			value: 'Todo el día'
		},
	];

	//Select
	const [selectedIndex, setSelectedIndex] = useState(
		momentTypes.findIndex(genderType => genderType.name === values?.schedule) !== -1
			? new IndexPath(momentTypes.findIndex(genderType => genderType.name === values?.schedule))
			: new IndexPath());
	const displayValue = momentTypes[selectedIndex?.row]?.value || '';
	const renderOption = (title) => (
		<SelectItem key={title} title={title} />
	);

	return (
		<View style={{ ...ownStyles?.dateWrapper }}>
			<View style={{ ...gloStyles?.inputs?.row }}>
				<Input
					style={{ ...gloStyles?.inputs?.input, ...ownStyles?.input }}
					label='Día'
					placeholder='xx/xx/xxxx'
					value={values?.date || ''}
					onFocus={() => { setCalendarVisible(true); }} />

				<Select
					style={{ ...gloStyles.inputs.select, ...ownStyles?.input }}
					label='Horario'
					placeholder='Selecciona un horario'
					value={displayValue}
					selectedIndex={selectedIndex}
					onSelect={index => {
						setSelectedIndex(new IndexPath(index - 1));
						handleChange(momentTypes[index - 1].name, "schedule");
					}}>
					{momentTypes.map(mT => mT.value).map(renderOption)}
				</Select>

				<Modal
					visible={calendarVisible}
					backdropStyle={{ ...gloStyles.modal.backdrop }}>
					<Card disabled={true}
						style={{ ...gloStyles.modal.card, marginBottom: keyboardSize }}>
						<View style={{ ...gloStyles.modal.view }}>
							<Calendar
								dateService={localeDateService}
								min={moment().toDate()}
								max={moment().add(1, 'years').toDate()}
								date={dateDate}
								onSelect={date => handleCalendar(date)} />
						</View>
					</Card>
				</Modal>
			</View>

			<View style={{ ...gloStyles?.inputs?.row }}>
				<Input
					style={{ ...gloStyles?.inputs?.input, ...ownStyles?.textarea }}
					label='Comentarios adicionales'
					placeholder='A partir de las... No antes de las...'
					value={values?.extra || ''}
					onChangeText={text => handleChange(text, "extra")}
					multiline={true}
					textStyle={{ minHeight: Device?.isPhone ? 144 : 72 }} />
			</View>
		</View>
	)
};

DateItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	date: PropTypes.object.isRequired,
	dateIndex: PropTypes.number.isRequired,
};

DateItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};