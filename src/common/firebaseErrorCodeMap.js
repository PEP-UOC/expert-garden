export default function firebaseErrorCodeMap(authCode, from = undefined) {
	switch (authCode) {
		case 'auth/wrong-password':
		case 'auth/invalid-password':
		case 'auth/user-not-found':
			return 'Usuario o contraseña incorrectos!';

		case 'auth/email-already-exists':
		case 'auth/email-already-in-use':
			if (from === 'workersAdd') {
				return 'Este trabajador ya está registrado!';
			} else {
				return 'Ya estás registrado! Accede a la plataforma.';
			}

		case 'auth/invalid-email':
			return 'Email no válido';

		case 'auth/too-many-requests':
			return 'Has intentado acceder demasiadas veces de forma incorrecta. Restaura la contraseña o vuelve a intentar acceder más tarde.';

		case 'auth/invalid-action-code':
			return 'El enlace que has utilizado ha caducado o ha sido utilizado. Vuelve a solicitar un nuevo enlace de validación por favor.';

		default:
			return 'Ha ocurrido un error!';
	}
}
