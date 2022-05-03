import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	btnServiceRequest: {
		width: Device?.isPhone ? '100%' : 250,
		height: Device?.isPhone ? undefined : 250,
		marginBottom: 20,
		marginLeft: Device?.isPhone ? undefined : 'auto',
		marginRight: Device?.isPhone ? undefined : 'auto',
	},
	btnIconWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: Device?.isPhone ? '100%' : 325,
	},
	btnWrapperWithIcon: {
		flexDirection: 'column',
	},
	btnOptionsWrapper: {
		flexDirection: 'column',
		width: Device?.isPhone ? '100%' : 225,
	},
	btnWrapper: {
		flexDirection: 'column',
		width: Device?.isPhone ? '100%' : 325,
	},
	btnServiceText: {
		textTransform: Device?.isPhone ? undefined : 'uppercase',
		fontSize: Device?.isPhone ? 14 : 18,
		textAlign: 'center',
	},
	btnServiceSubText: {
		fontSize: Device?.isPhone ? 10 : 14,
		textAlign: 'center',
		marginTop: 5,
	},
	servicesList: {
		width: Device?.isPhone ? '100%' : 960,
		flexDirection: Device.isPhone ? 'colum' : 'row',
		flexWrap: 'wrap',
	},
	layers: {
		fill: '#fff',
		width: 27,
		height: 27,
	},
	btnServiceTextLight: {
		textTransform: Device?.isPhone ? undefined : 'uppercase',
		fontSize: Device?.isPhone ? 14 : 16,
		textAlign: 'center',
		color: '#fff',
	},
	btnServiceSubTextLight: {
		fontSize: Device?.isPhone ? 10 : 12,
		textAlign: 'center',
		marginTop: 5,
		color: '#fff',
	},
	btnServiceResume: {
		marginTop: Device?.isPhone ? 0 : 0,
		marginBottom: Device?.isPhone ? 0 : 0,
		width: Device?.isPhone ? '100%' : 325,
	},
	btnServiceAtras: {
		marginTop: Device?.isPhone ? 10 : 30,
		marginBottom: Device?.isPhone ? 15 : 100,
	},
});

export default styles;
