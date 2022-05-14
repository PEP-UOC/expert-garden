import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	wrapper: {
		marginBottom: Device.isPhone ? 30 : 30,
	},
	item: {
		marginLeft: Device.isPhone ? 0 : 37,
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
	image: {
		width: '100%',
		minHeight: Device.isPhone ? Device.width - 50 : 380,
		marginBottom: 10,
	},
	responseRow: {
		flexDirection: 'row',
		marginBottom: Device?.isPhone ? 15 : 20,
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	textBadge: {
		borderRadius: 4,
		margin: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 0,
		paddingBottom: 0,
		marginLeft: Device?.isPhone ? 10 : 15,
	},
	bgError: {
		backgroundColor: 'color-danger-500',
	},
	bgOk: {
		backgroundColor: 'color-success-500',
	},
	inputsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingLeft: Device?.isPhone ? 0 : 60,
		width: '100%',
	},
	iconsContact: {
		width: 20,
		height: 20,
		fill: 'color-primary-500',
	},
});

export default styles;
