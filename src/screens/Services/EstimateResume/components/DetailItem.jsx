import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Data
import { servicesTypes } from '../../../../data/servicesTypes'

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View, TouchableWithoutFeedback } from 'react-native'
import { Text, Icon } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Hooks
import { useFirebaseServiceUtils } from "../../../../hooks/useFirebaseServiceUtils"

// eslint-disable-next-line no-unused-vars
export const DetailItem = ({ debug, detail, detailIndex, cid, sid, prevEstimation }) => {

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(detail)

	//State
	const [valuesEstimate, setValuesEstimate] = useState({
		price: prevEstimation,
	})

	const [showInputs, setShowInputs] = useState(false);

	//Save service
	// eslint-disable-next-line no-unused-vars
	const { saved, handleBusinessEstimateServiceDetail } = useFirebaseServiceUtils(debug)

	//Handle
	function handleChange(value, keyName) {
		setValuesEstimate(prevValues => {
			return {
				...prevValues,
				[keyName]: value
			}
		})
	}

	useEffect(() => {
		if (prevEstimation > 0) {
			handleChange(String(prevEstimation), "price")
		}
	}, [prevEstimation]);

	return (
		<View key={values?.sdid} style={{ ...ownStyles.itemWrapper }}>
			<View style={{ ...ownStyles.viewWrapperTop }}>

				{/*DETALLE*/}
				<Text style={{ ...ownStyles.textDetalleTop }}>
					{`#️ Detalle ${detailIndex + 1}`}
				</Text>

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

			{/*VER + Y PRECIO*/}
			<View
				key={`show-${detailIndex}`}
				style={{ ...ownStyles.viewWrapperBottom }}>
				<TouchableWithoutFeedback
					onPress={() => setShowInputs(!showInputs)}
				>
					<View
						style={{
							...ownStyles.bottomItem,
							marginBottom: !showInputs ? 0 : 30, cursor: 'pointer'
						}}>
						{!showInputs
							? <Icon
								name='eye-outline'
								fill={ownStyles.iconCloseTop.fill}
								width={ownStyles.iconCloseTop.width}
								height={ownStyles.iconCloseTop.height}
								style={{
									alignSelf: 'flex-end',
								}}
							/>
							: <Icon
								name='eye-off-outline'
								fill={ownStyles.iconCloseTop.fill}
								width={ownStyles.iconCloseTop.width}
								height={ownStyles.iconCloseTop.height}
								style={{
									alignSelf: 'flex-end'
								}}
							/>}
						<Text style={{ marginLeft: 5 }}>{!showInputs ? 'Ver más' : 'Ocultar'}</Text>
					</View>
				</TouchableWithoutFeedback>
				<Text
					category="h2"
					style={{
						...ownStyles.bottomItem,
						marginBottom: !showInputs ? 0 : 30
					}}>{valuesEstimate?.price || ''} €</Text>
			</View>

			{
				showInputs && (
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
									if (!values?.inputs[input?.identifier]) {
										return null
									}
									return (
										<View key={input.inputId}>
											<Text category="p1">{` - ${input.label}` || ''}</Text>
											<Text style={{ ...ownStyles.inputResponse }} category="p1">{values?.inputs[input?.identifier] || ''}</Text>
										</View>
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
									if (!values?.inputs[input?.identifier]) {
										return null
									}
									return (
										<View key={input.inputId}>
											<Text category="p1">{` - ${input.label}` || ''}</Text>
											<Text style={{ ...ownStyles.inputResponse }} category="p1">{values?.inputs[input?.identifier] || ''}</Text>
										</View>
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
									if (!values?.inputs[input?.identifier]) {
										return null
									}
									return (
										<View key={input.inputId}>
											<Text category="p1">{` - ${input.label}` || ''}</Text>
											<Text style={{ ...ownStyles.inputResponse }} category="p1">{values?.inputs[input?.identifier] || ''}</Text>
										</View>
									)
								})
						}
					</View>
				)
			}
		</View >
	)
};

DetailItem.propTypes = {
	debug: PropTypes.bool.isRequired,
	detail: PropTypes.object.isRequired,
	detailIndex: PropTypes.number.isRequired,
	cid: PropTypes.string.isRequired,
	sid: PropTypes.string.isRequired,
	prevEstimation: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

DetailItem.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
