import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	wrapper: {
		marginBottom: Device.isPhone ? 20 : 30,
	},
	item: {
		marginLeft: Device.isPhone ? 0 : 37,
	},
	accessory: {
		borderRadius: 5,
		paddingTop: 10,
		paddingRight: 7,
		paddingBottom: 10,
		paddingLeft: 7,
		marginLeft: 20,
		backgroundColor: '#31a06008',
		borderColor: 'color-primary-900',
		border: 'solid',
		borderWidth: Device?.isPhone ? 1 : 1,
	},
});

export default styles;
