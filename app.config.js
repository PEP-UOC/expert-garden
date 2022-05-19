import 'dotenv/config';

export default {
	expo: {
		name: 'Expert Garden',
		slug: 'expert-garden',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './src/assets/images/icon.png',
		splash: {
			image: './src/assets/images/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		plugins: [
			[
				'expo-notifications',
				{
					icon: './src/assets/images/icon.png',
					color: '#ffffff',
				},
			],
		],
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
		android: {
			package: `com.expertgarden.${process.env.APP_VARIANT}`,
			googleServicesFile: './google-services.json',
			adaptiveIcon: {
				foregroundImage: './src/assets/images/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		ios: {
			bundleIdentifier: `com.expertgarden.${process.env.APP_VARIANT}`,
			googleServicesFile: './GoogleService-Info.plist',
			supportsTablet: true,
		},
		web: {
			favicon: './src/assets/images/favicon.png',
			config: {
				firebase: {
					apiKey: process.env.FIREBASE_API_KEY,
					authDomain: process.env.FIREBASE_AUTH_DOMAIN,
					projectId: process.env.FIREBASE_PROJECT_ID,
					storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
					messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
					appId: process.env.FIREBASE_APP_ID,
					measurementId: process.env.FIREBASE_MEASUREMENT_ID,
				},
			},
			build: {
				babel: {
					include: ['@ui-kitten/components'],
				},
				production: {
					env: {
						debug: false,
						firebaseApiKey: process.env.FIREBASE_API_KEY,
						firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
						firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
						firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
						firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
						firebaseAppId: process.env.FIREBASE_APP_ID,
						firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
					},
				},
			},
		},
	},
};
