import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	wrapper: {
		marginBottom: Device.isPhone ? 0 : 40,
	},
});

export default styles;
