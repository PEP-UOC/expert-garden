import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	servicesList: {
		width: Device?.isPhone ? '100%' : 960,
		flexDirection: Device.isPhone ? 'colum' : 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	btnServiceRequest: {
		width: Device?.isPhone ? '100%' : 250,
		height: Device?.isPhone ? undefined : 250,
		marginBottom: 20,
	},
	btnOptionsWrapper: {
		flexDirection: 'column',
		width: Device?.isPhone ? '100%' : 225,
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
	inputsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingLeft: Device?.isPhone ? 0 : 60,
		width: '100%',
	},
	input: {
		marginBottom: Device?.isPhone ? 20 : 30,
	},
	btnAddService: {
		marginTop: Device?.isPhone ? 0 : 35,
	},
	btnRow: {
		flexDirection: Device.isPhone ? 'colum' : 'row',
		alignItems: 'center',
		width: Device?.isPhone ? '100%' : 960,
		justifyContent: 'space-between',
		marginTop: Device?.isPhone ? 15 : 35,
		marginBottom: Device?.isPhone ? 0 : 0,
	},
	btnRowFull: {
		width: '100%',
		paddingLeft: Device?.isPhone ? 0 : 60,
	},
	btnServiceResume: {
		marginTop: Device?.isPhone ? 0 : 0,
		marginBottom: Device?.isPhone ? 10 : 0,
		width: Device?.isPhone ? '100%' : 250,
		order: Device?.isPhone ? 1 : 2,
	},
	btnServiceResumeFull: {
		width: Device?.isPhone ? '100%' : 325,
	},
	btnServiceAtras: {
		marginTop: Device?.isPhone ? 10 : 0,
		marginBottom: Device?.isPhone ? 15 : 0,
		width: Device?.isPhone ? '100%' : 250,
		order: Device?.isPhone ? 2 : 1,
	},
	btnWrapper: {
		flexDirection: 'column',
		width: Device?.isPhone ? '100%' : 250,
	},
	btnIconWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: Device?.isPhone ? '100%' : 250,
	},
	btnWrapperWithIcon: {
		flexDirection: 'column',
	},
	btnServiceAtrasFull: {
		width: Device?.isPhone ? '100%' : 325,
	},
});

export default styles;
