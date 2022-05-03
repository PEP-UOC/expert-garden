import { StyleService } from '@ui-kitten/components';

//Device Detect
//import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	fullScreen: {
		backdrop: {
			backgroundColor: '#fff',
		},
		view: {
			maxWidth: '100%',
			display: 'flex',
			alignItems: 'center',
		},
		icons: {
			marginBottom: 10,
			fontSize: 36,
		},
		text: {
			marginBottom: 10,
			fontSize: 18,
			textAlign: 'center',
		},
	},
	error: {
		backdrop: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		view: {
			maxWidth: 300,
			display: 'flex',
			alignItems: 'center',
		},
		icons: {
			marginBottom: 10,
			fontSize: 36,
		},
		text: {
			marginBottom: 10,
			fontSize: 18,
			textAlign: 'center',
		},
	},
});

export default styles;
