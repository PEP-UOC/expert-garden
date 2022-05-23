/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Data
import { servicesTypes } from '../../../../data/servicesTypes'

//Navigation
//import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text, Input, Button } from '@ui-kitten/components';
import { TitleSection } from '../../../../components/Titles/Section'

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Icons
import { SaveIcon } from '../../../../assets/icons/Save'

//Hooks
import { useFirebaseServiceUtils } from "../../../../hooks/useFirebaseServiceUtils"

// eslint-disable-next-line no-unused-vars
export const DetailItem = ({ debug, detail, detailIndex, cid, sid, prevEstimation }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	// eslint-disable-next-line no-unused-vars
	const [values, setValues] = useState(detail)

	//State
	const [valuesEstimate, setValuesEstimate] = useState({
		price: prevEstimation,
	})

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

	function cleanNonNumericChars(text) {
		if (!text || typeof text !== 'string') {
			text = String(text);
		}
		// Remove non numeric and non .- chars
		text = text.replace(/[^\d.,-]/g, '');

		// replace "," with "."
		text = text.replace(',', '.');

		// Remove extra periods ('.', only one, at most left allowed in the string)
		let splitText = text.split('.');
		text =
			splitText.shift() +
			(splitText.length
				? '.' + splitText[0].slice(0, 2)
				: '');

		// Remove '-' signs if there is more than one, or if it is not most left char
		for (var i = 1; i < text.length; i++) {
			var char = text.substr(i, 1);
			if (char == '-') {
				text = text.substr(0, i) + text.substr(i + 1);
				// decrement value to avoid skipping character
				i--;
			}
		}

		// Remove leading zeros
		text = text.replace(/^(-)?0+(?=\d)/, '$1'); //?=\d is a positive lookahead, which matches any digit 0-9

		return text;
	}

	const saveDetailPrice = () => {
		handleBusinessEstimateServiceDetail(sid, cid, values.sdid, valuesEstimate.price)
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

			<View style={{ ...ownStyles.inputsRow }}>
				<View style={{ ...gloStyles.inputs.input, flexDirection: 'row', alignItems: 'flex-end' }}>
					<Input style={{ flex: 1 }}
						label={'Precio'}
						placeholder={''}
						value={valuesEstimate?.price || ''}
						onChangeText={text => {
							const textCleaned = cleanNonNumericChars(text)
							handleChange(textCleaned, "price")
						}}
					/>
					<Button
						style={{ height: 14, marginLeft: 10 }}
						appearance={valuesEstimate?.price !== '' && String(prevEstimation) !== String(valuesEstimate?.price) ? 'filled' : 'ghost'}
						accessoryLeft={<SaveIcon fill={valuesEstimate?.price !== '' && String(prevEstimation) !== String(valuesEstimate?.price) ? ownStyles.iconColorActive.fill : ownStyles.iconColorDisabled.fill} />}
						onPress={() => {
							if (valuesEstimate?.price === '') {
								return
							} else {
								saveDetailPrice()
							}
						}}
					/>
				</View>
			</View>
		</View>

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
