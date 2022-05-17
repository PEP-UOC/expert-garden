import { StyleService } from '@ui-kitten/components';

//Device Detect
//import Device from '../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	badgeAccepted: {
		borderRadius: 5,
		backgroundColor: 'color-primary-500',
		justifyContent: 'center',
	},
	badgeRejected: {
		borderRadius: 5,
		backgroundColor: 'color-danger-500',
		justifyContent: 'center',
	},
	badgeRevision: {
		borderRadius: 5,
		backgroundColor: 'color-primary-200',
		justifyContent: 'center',
	},
	badgeWaiting: {
		borderRadius: 5,
		backgroundColor: 'color-warning-300',
		justifyContent: 'center',
	},
	badgeText: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 10,
		paddingLeft: 10,
		fontSize: 10,
	},
	bigBadgeText: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingRight: 15,
		paddingLeft: 15,
		fontSize: 14,
	},
	iconButton: {
		height: 14,
		marginRight: 10,
		paddingTop: 7,
		paddingRight: 10,
		paddingBottom: 7,
		paddingLeft: 10,
		backgroundColor: '#fff',
	},
	iconColor: {
		fill: 'color-primary-500',
	},
});

export default styles;
