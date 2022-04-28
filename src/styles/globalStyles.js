import { StyleService } from '@ui-kitten/components';

//Device Detect
import Device from '../libs/react-native-device-detection';
import { Platform } from 'react-native';

const globalStyles = StyleService.create({
	textCenter: {
		textAlign: 'center',
	},
	scrollView: Device?.isPhone
		? Platform?.OS === 'ios'
			? {
					minHeight: '100%',
			  }
			: {
					minHeight: '100%',
			  }
		: {
				flex: 1,
				justifyContent: 'space-between',
		  },
	layout: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 25,
	},
	view: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		maxWidth: Device?.isPhone ? undefined : 1200,
		flexDirection: Device?.isPhone ? 'column' : 'row',
		//backgroundColor: 'red',
	},
	section: {
		full: {
			flexDirection: 'column',
			width: Device?.isPhone ? '100%' : 700,
			marginLeft: 'auto',
			marginRight: 'auto',
			//backgroundColor: 'blue',
		},
		primary: {
			flexDirection: 'column',
			height: Device?.isPhone ? undefined : '100%',
			width: Device?.isPhone ? '100%' : '35%',
			paddingRight: Device?.isPhone ? 0 : 40,
			//backgroundColor: 'orange',
		},
		secondary: {
			flexDirection: 'column',
			height: Device?.isPhone ? undefined : '100%',
			width: Device?.isPhone ? '100%' : '65%',
			paddingLeft: Device?.isPhone ? 0 : 40,
			//backgroundColor: 'yellow',
		},
	},
	h1: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
	h2: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
	h3: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
	h4: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
	h5: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
	h6: { marginBottom: 20, alignSelf: 'flex-start', textAlign: 'left' },
	card: {
		width: '100%',
		marginBottom: 30,
	},
	button: {
		width: Device?.isPhone ? '100%' : 325,
		marginBottom: 20,
		marginLeft: Device?.isPhone ? undefined : 'auto',
		marginRight: Device?.isPhone ? undefined : 'auto',
	},
	buttonGhost: {
		width: Device?.isPhone ? '100%' : 325,
		marginBottom: 0,
		marginLeft: Device?.isPhone ? undefined : 'auto',
		marginRight: Device?.isPhone ? undefined : 'auto',
	},
	inputs: {
		wrapper: {
			marginTop: Device?.isPhone ? 10 : 20,
			marginLeft: Device?.isPhone ? 0 : 50,
		},
		row: {
			display: 'flex',
			flexDirection: Device?.isPhone ? 'column' : 'row',
			justifyContent: 'space-between',
		},
		select: {
			width: Device?.isPhone ? '100%' : 325,
			marginBottom: 20,
			alignSelf: 'center',
		},
		input: {
			width: Device?.isPhone ? '100%' : 325,
			marginBottom: 20,
			alignSelf: 'center',
		},
		captionText: {
			fontSize: 12,
			color: '#8F9BB3',
		},
	},
	leaf: {
		marginTop: 20,
		fill: 'color-primary-100',
	},
	smallText: {
		textAlign: 'center',
		marginTop: 5,
		marginBottom: 5,
	},
	modal: {
		backdrop: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		card: {
			padding: 2,
		},
		view: {
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
	colorPrimary500: { color: 'color-primary-500' },
});

export default globalStyles;
