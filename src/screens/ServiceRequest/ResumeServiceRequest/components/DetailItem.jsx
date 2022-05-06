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
import { updateDetail } from '../../../../store/service/serviceAction';

//Data
import { servicesTypes } from '../../../../data/servicesTypes'

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View, TouchableWithoutFeedback } from 'react-native'
import { Text, Input, Icon } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

// eslint-disable-next-line no-unused-vars
export const DetailItem = ({ debug, detail, detailIndex, setSdidToRemove, setShowDeleteConfirm }) => {
	const dispatch = useDispatch()
	console.log('detail', detail)

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [values, setValues] = useState(detail)

	const [showInputs, setShowInputs] = useState(false);

	const renderCaption = (caption) => {
		return (
			<Text style={{ ...gloStyles.inputs.captionText }}>{caption}</Text>
		)
	}

	function handleInputChange(value, keyName) {
		setValues(prevValues => {
			console.log('prevValues', prevValues)
			return {
				...prevValues,
				inputs: {
					[keyName]: value
				}
			}
		})

		const newDetail = { ...values }
		newDetail[keyName] = value;
		console.log('📜 DEIT - newDetail', newDetail)

		dispatch(updateDetail(newDetail, detailIndex))
	}

	return (
		<View key={values?.sdid} style={{ ...ownStyles.serviceWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Detalle ${detailIndex + 1}`}
				</Text>

				{/*ICONO ELIMINAR*/}
				<TouchableWithoutFeedback
					onPress={() => {
						setSdidToRemove(values?.sdid)
						setShowDeleteConfirm(true)
					}}>
					<Icon
						name='close'
						fill={ownStyles.iconCloseTop.fill}
						width={ownStyles.iconCloseTop.width}
						height={ownStyles.iconCloseTop.height}
					/>
				</TouchableWithoutFeedback>
			</View>

			{/*TITULO SECCIÓN SERVICIO*/}
			<TitleSection icon={''}
				exterStyles={
					{
						wrapper: {
							marginBottom: Device?.isPhone ? 15 : 15
						},
						primaryText: {
							fontSize: Device?.isPhone ? 22 : 22,
							lineHeight: Device?.isPhone ? 25 : undefined
						}
					}
				}
				primaryText={`${servicesTypes.find((type) => type.identifier === values?.type)?.label}`}
				secondaryText={''}
			/>

			{/*STEP 1*/}
			{values?.step1 !== '' && (
				<View>
					<Text style={{ ...ownStyles.textQuestion }}>
						{`${servicesTypes.find((type) => type.id === values?.typeId)?.question}`}
					</Text>
					<Text style={{ ...ownStyles.textResponse }}>
						{
							`${servicesTypes.find((type) => type.identifier === values?.type)
								?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
								?.label
							}`
						}
					</Text>
				</View>
			)}

			{/*STEP 2*/}
			{values?.step2 !== '' && (
				<View>
					<Text style={{ ...ownStyles.textQuestion }}>
						{`${servicesTypes.find((type) => type.id === values?.typeId)?.step1types.find((type1) => type1.step1typeId === values?.step1id)?.question}`}
					</Text>
					<Text style={{ ...ownStyles.textResponse }}>
						{
							`${servicesTypes.find((type) => type.identifier === values?.type)
								?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
								?.step2types?.find((type2) => type2.step2typeId === values?.step2id)
								?.label
							}`
						}
					</Text>
				</View>
			)}

			{/*STEP 3*/}
			{values?.step3 !== '' && (
				<View>
					<Text style={{ ...ownStyles.textQuestion }}>
						{`${servicesTypes.find((type) => type.id === values?.typeId)?.step1types.find((type1) => type1.step1typeId === values?.step1id)?.step2types.find((type2) => type2.step2typeId === values?.step2id)?.question}`}
					</Text>
					<Text style={{ ...ownStyles.textResponse }}>
						{
							`${servicesTypes.find((type) => type.identifier === values?.type)
								?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
								?.step2types?.find((type2) => type2.step2typeId === values?.step2id)
								?.step3types?.find((type3) => type3.step3typeId === values?.step3id)
								?.label
							}`
						}
					</Text>
				</View>
			)}

			<View
				key={`show-${detailIndex}`}
				style={{
					marginTop: 'auto'
				}}>
				<TouchableWithoutFeedback
					onPress={() => setShowInputs(!showInputs)}
				>
					{!showInputs
						? <Icon
							name='edit-outline'
							fill={ownStyles.iconCloseTop.fill}
							width={ownStyles.iconCloseTop.width}
							height={ownStyles.iconCloseTop.height}
							style={{
								cursor: 'pointer',
								alignSelf: 'flex-end',
								marginBottom: 20,
							}}
						/>
						: <Icon
							name='corner-right-up-outline'
							fill={ownStyles.iconCloseTop.fill}
							width={ownStyles.iconCloseTop.width}
							height={ownStyles.iconCloseTop.height}
							style={{
								cursor: 'pointer',
								alignSelf: 'flex-end',
								marginBottom: 20,
							}}
						/>}
				</TouchableWithoutFeedback>
			</View>

			{showInputs && (
				<View>
					{/*INPUTS LEVEL 1*/}
					{
						servicesTypes?.find((type) => type.id === values?.typeId)
							?.step1types?.find((type1) => type1.step1typeId === values?.step1id)?.inputs
							?.length > 0
						&&
						servicesTypes?.find((type) => type.id === values?.typeId)
							?.step1types?.find((type1) => type1.step1typeId === values?.step1id)?.inputs
							?.map((input) => {
								//console.log('input1', input)
								return (
									<Input
										key={input.inputId}
										style={{ ...gloStyles?.inputs?.input }}
										label={input.label}
										caption={renderCaption(input.caption)}
										placeholder={input.placeholder}
										value={values?.inputs[input?.identifier] || ''}
										onChangeText={text => handleInputChange(text, input.identifier)}
										multiline={input.type === 'textarea'}
										textStyle={input.type === 'textarea' && { minHeight: 144 }}
									/>
								)
							})
					}

					{/*INPUTS LEVEL 2*/}
					{
						servicesTypes?.find((type) => type.id === values?.typeId)
							?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
							?.step2types?.find((type2) => type2.step2typeId === values?.step2id)?.inputs
							?.length > 0
						&&
						servicesTypes?.find((type) => type.id === values?.typeId)
							?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
							?.step2types?.find((type2) => type2.step2typeId === values?.step2id)?.inputs
							?.map(input => {
								//console.log('input2', input)
								return (
									<Input
										key={input.inputId}
										style={{ ...gloStyles?.inputs?.input }}
										label={input.label}
										caption={renderCaption(input.caption)}
										placeholder={input.placeholder}
										value={values?.inputs[input?.identifier] || ''}
										onChangeText={text => handleInputChange(text, input.identifier)}
										multiline={input.type === 'textarea'}
										textStyle={input.type === 'textarea' && { minHeight: 144 }}
									/>
								)
							})
					}

					{/*INPUTS LEVEL 3*/}
					{
						servicesTypes?.find((type) => type.id === values?.typeId)
							?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
							?.step2types?.find((type2) => type2.step2typeId === values?.step2id)
							?.step3types?.find((type3) => type3.step3typeId === values?.step3id)?.inputs
							?.length > 0
						&&
						servicesTypes?.find((type) => type.id === values?.typeId)
							?.step1types?.find((type1) => type1.step1typeId === values?.step1id)
							?.step2types?.find((type2) => type2.step2typeId === values?.step2id)
							?.step3types?.find((type3) => type3.step3typeId === values?.step3id)?.inputs
							?.map(input => {
								//console.log('input3', input)
								return (
									<Input
										key={input.inputId}
										style={{ ...gloStyles?.inputs?.input }}
										label={input.label}
										caption={renderCaption(input.caption)}
										placeholder={input.placeholder}
										value={values?.inputs[input?.identifier] || ''}
										onChangeText={text => handleInputChange(text, input.identifier)}
										multiline={input.type === 'textarea'}
										textStyle={input.type === 'textarea' && { minHeight: 144 }}
									/>
								)
							})
					}
				</View>
			)}

		</View>
	)
};

DetailItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	detail: PropTypes.object.isRequired,
	detailIndex: PropTypes.number.isRequired,
	setSdidToRemove: PropTypes.func.isRequired,
	setShowDeleteConfirm: PropTypes.func.isRequired,
};

DetailItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
