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
});

export default styles;
