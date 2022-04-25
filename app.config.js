import 'dotenv/config';

export default {
	expo: {
		name: 'expert-garden',
		slug: 'expert-garden',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './src/assets/images/icon.png',
		splash: {
			image: './src/assets/images/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		extra: {
			debug: process.env.DEBUG === 'true' || false,
			firebaseApiKey: process.env.FIREBASE_API_KEY,
			firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
			firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
			firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			firebaseAppId: process.env.FIREBASE_APP_ID,
			firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './src/assets/images/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './src/assets/images/favicon.png',
			config: {
				firebase: {
					apiKey: 'AIzaSyDb2ver9X-LTcTdsa84J-cTHDOe16yh82A',
					authDomain: 'expert-garden.firebaseapp.com',
					projectId: 'expert-garden',
					storageBucket: 'expert-garden.appspot.com',
					messagingSenderId: '644824745090',
					appId: '1:644824745090:web:fe962dbbaf41c4a4e4e09b',
					measurementId: 'G-HV58GWH706',
				},
			},
			build: {
				babel: {
					include: ['@ui-kitten/components'],
				},
			},
		},
	},
};
