import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	itemsWrapper: {
		flexDirection: Device?.isPhone ? 'column' : 'row',
		flexWrap: 'wrap',
	},
	itemWrapper: {
		border: 'solid',
		borderWidth: Device?.isPhone ? 1 : 1,
		borderColor: 'color-primary-900',
		borderRadius: 5,
		backgroundColor: '#31a06008',
		//backgroundColor: 'color-primary-transparent-100',
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 0,
		marginBottom: 25,
		marginRight: Device?.isPhone ? 0 : 25,
		marginLeft: Device?.isPhone ? 0 : 25,
		width: Device?.isPhone ? '100%' : 350,
	},
	viewWrapperTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textDetalleTop: {
		marginBottom: Device?.isPhone ? 15 : 20,
	},
	iconCloseTop: {
		fill: 'color-primary-800',
		width: 27,
		height: 27,
	},
	textQuestion: {
		marginBottom: Device?.isPhone ? 10 : 10,
		fontSize: Device?.isPhone ? 18 : 20,
		color: 'color-primary-800',
	},
	textResponse: {
		marginBottom: Device?.isPhone ? 15 : 20,
		marginLeft: Device?.isPhone ? 10 : 15,
		fontSize: Device?.isPhone ? 16 : 18,
		color: 'color-primary-600',
	},
	btnServiceRequest: {
		width: Device?.isPhone ? '100%' : 250,
		height: Device?.isPhone ? undefined : 250,
		marginBottom: 20,
		marginLeft: Device?.isPhone ? undefined : 'auto',
		marginRight: Device?.isPhone ? undefined : 'auto',
	},
	btnWrapper: {
		flexDirection: 'column',
		width: Device?.isPhone ? '100%' : 325,
	},
	btnServiceText: {
		//textTransform: Device?.isPhone ? undefined : 'uppercase',
		fontSize: Device?.isPhone ? 14 : 18,
		textAlign: 'center',
	},
	btnServiceSubText: {
		fontSize: Device?.isPhone ? 10 : 14,
		textAlign: 'center',
		marginTop: 5,
	},
	servicesList: {
		width: Device?.isPhone ? '100%' : 960,
		flexDirection: Device.isPhone ? 'column' : 'row',
		flexWrap: 'wrap',
	},
});

export default styles;
