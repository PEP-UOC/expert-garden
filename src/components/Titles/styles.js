import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	screenWrapper: {
		marginBottom: 30,
	},
	screenText: {
		color: 'color-primary-900',
		marginBottom: 0,
		marginLeft: Device.isPhone ? 0 : 10,
	},
	sectionWrapper: {
		marginBottom: 0,
		flexDirection: 'row',
	},
	sectionText: {
		color: 'color-primary-900',
		marginBottom: 5,
		marginLeft: Device.isPhone ? 0 : 10,
	},
});

export default styles;
