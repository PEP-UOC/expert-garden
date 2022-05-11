import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
//import { Platform } from 'react-native';

const styles = StyleService.create({
	wrapper: {
		marginBottom: Device.isPhone ? 0 : 40,
	},
	item: {
		marginLeft: Device.isPhone ? 0 : 37,
	},
	garden: {
		card: {
			width: Device.isPhone ? 300 : 380,
			marginLeft: 5,
			marginRight: 5,
			marginTop: 5,
			marginBottom: 5,
		},
		cardAddGarden: {
			width: Device.isPhone ? 200 : 280,
			marginRight: 5,
			marginTop: 5,
			marginBottom: 5,
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
		},
		row: {
			flexDirection: 'column',
		},
		btnDetails: {
			marginTop: 10,
		},
	},
	addGardenIcon: {
		fill: 'color-primary-500',
	},
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
