import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	wrapper: {
		marginBottom: 20,
	},
	image: {
		width: '100%',
		minHeight: Device.isPhone ? Device.width - 50 : 380,
		marginBottom: 10,
	},
	camera: {
		flex: 1,
		width: '100%',
		minHeight: 325,
		marginBottom: 10,
	},
	cameraZoomView: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		margin: 20,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	cameraView: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		margin: 20,
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	cameraTouchable: {
		width: 50,
		height: 50,
		bottom: 0,
		borderRadius: 50,
		backgroundColor: '#ffffff80',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cameraIcon: {
		fill: 'color-primary-800',
	},
});

export default styles;
