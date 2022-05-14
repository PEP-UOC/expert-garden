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
});

export default styles;
