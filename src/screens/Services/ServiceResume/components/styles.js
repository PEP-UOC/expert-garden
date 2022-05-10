import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	servicesWrapper: {
		justifyContent: 'space-between',
		flexDirection: Device?.isPhone ? 'column' : 'row',
		flexWrap: 'wrap',
	},
	serviceWrapper: {
		border: 'solid',
		borderWidth: Device?.isPhone ? 1 : 1,
		borderColor: 'color-primary-900',
		borderRadius: 5,
		backgroundColor: '#31a06008',
		//backgroundColor: 'color-primary-transparent-100',
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		marginBottom: 25,
		//marginRight: Device?.isPhone ? 0 : 25,
		//marginLeft: Device?.isPhone ? 0 : 25,
		width: Device?.isPhone ? '100%' : 350,
	},
	viewWrapperTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textDetalleTop: {
		marginBottom: Device?.isPhone ? 15 : 15,
	},
	textQuestion: {
		marginBottom: Device?.isPhone ? 10 : 10,
		fontSize: Device?.isPhone ? 18 : 18,
		color: 'color-primary-800',
	},
	textResponse: {
		marginBottom: Device?.isPhone ? 15 : 20,
		marginLeft: Device?.isPhone ? 10 : 15,
		fontSize: Device?.isPhone ? 16 : 18,
		color: 'color-primary-600',
	},
	inputResponse: {
		marginBottom: Device?.isPhone ? 15 : 20,
		marginLeft: Device?.isPhone ? 20 : 25,
		fontSize: Device?.isPhone ? 16 : 18,
		color: 'color-primary-600',
	},
	iconCloseTop: {
		fill: 'color-primary-800',
		width: 27,
		height: 27,
	},
});

export default styles;
