import { StyleService } from '@ui-kitten/components';

//Device Detect
//import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	scrollHeight: { minHeight: undefined },
	mainTitle: { alignSelf: 'center', textAlign: 'center', color: 'color-primary-500' },
	topSubTitle: {
		marginBottom: 0,
		alignSelf: 'center',
		textAlign: 'center',
		color: 'color-primary-500',
	},
});

export default styles;
