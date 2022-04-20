import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	wrapper: {
		marginBottom: 15,
	},
	logo: {
		marginBottom: -22,
		marginLeft: -85,
		fill: 'color-primary-500',
		alignSelf: 'flex-start',
		display: Device.isPhone ? 'none' : 'block',
	},
	btnWithLogo: {
		width: '100%',
	},
	btnPrimary: {
		width: '100%',
	},
	btnSecondary: {
		width: '100%',
	},
	btnImageCombo: {
		width: '100%',
	},
	btnImageComboCenter: {
		flex: 1,
		backgroundColor: 'white',
	},
	btnImageComboTextAlternative: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	btnImageComboTextAdvice: {
		position: 'absolute',
		bottom: Device.isPhone ? -25 : -25,
		width: '100%',
		color: 'color-danger-500',
		fontSize: Device.isPhone ? 9 : 12,
	},
});

export default styles;
