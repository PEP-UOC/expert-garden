import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Components
import { Text, Button, Card } from '@ui-kitten/components';

//Icons
import { PaperPlaneIcon } from '../../../assets/icons/PaperPlane'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const EmailVerify = ({ debug, user }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//Firebase
	const auth = firebase.auth;

	//Email verification
	const resendEmail = (auth) => {
		auth()?.currentUser?.sendEmailVerification()
	};

	//Send email counter
	const [emailCounter, setEmailCounter] = useState(0);
	useEffect(() => {
		const timer =
			emailCounter > 0 && setInterval(() => setEmailCounter(emailCounter - 1), 1000);
		return () => clearInterval(timer);
	}, [emailCounter]);

	if (user && !user?.verified) {
		return (
			<Card style={{ ...gloStyles?.card }} status='danger'>
				{user?.additionalUserInfo?.isNewUser ?
					(
						<>
							<Text category='p1' style={{ ...gloStyles?.textCenter }} >!Gracias por registrarte!</Text>
							<Text category='p1' style={{ ...gloStyles?.textCenter }} >Ahora necesitamos verificar tu email: {user?.user?.email}</Text>
						</>
					) : (
						<Text category='p1' style={{ ...gloStyles?.textCenter }}>Verifica tu email: {user?.user?.email}</Text>
					)}
				<Button style={{ ...gloStyles?.button, ...ownStyles?.btnEmailVerify }} appearance='ghost' size='large' onPress={() => {
					resendEmail(auth)
					setEmailCounter(180);
				}} accessoryLeft={PaperPlaneIcon} disabled={emailCounter > 0}>Reenviar email</Button>
				{emailCounter > 0 &&
					<Text category='c1' style={{ ...gloStyles?.smallText }}>Espera {emailCounter}s. para enviar un nuevo email de verificación.</Text>}
			</Card>
		)
	}
	return null;
};

EmailVerify.propTypes = {
	debug: PropTypes.bool.isRequired,
	user: PropTypes.object,
};

EmailVerify.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
