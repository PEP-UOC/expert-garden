import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	dateWrapper: {
		border: 'solid',
		borderWidth: Device?.isPhone ? 1 : 1,
		borderColor: 'color-primary-900',
		borderRadius: 5,
		backgroundColor: '#31a06008',
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 0,
		marginBottom: 25,
		width: '100%',
	},
	input: {
		width: Device?.isPhone ? '100%' : 325,
	},
	textarea: {
		width: '100%',
	},
});

export default styles;
