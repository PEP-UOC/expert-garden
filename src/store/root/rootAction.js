import {
	SET_LOGGED_IN,
	SET_VALIDATING_MESSAGE,
	SET_LOADING_MESSAGE,
	SET_ERROR_MESSAGE,
	SET_PUSH_TOKEN,
} from './rootTypes';
export const setLoggedIn = (loggedIn) => ({
	type: SET_LOGGED_IN,
	payload: loggedIn,
});
export const setValidatingMessage = (validatingMessage) => ({
	type: SET_VALIDATING_MESSAGE,
	payload: validatingMessage,
});
export const setLoadingMessage = (loadingMessage) => ({
	type: SET_LOADING_MESSAGE,
	payload: loadingMessage,
});
export const setErrorMessage = (errorMessage) => ({
	type: SET_ERROR_MESSAGE,
	payload: errorMessage,
});
export const setPushToken = (pushToken) => ({
	type: SET_PUSH_TOKEN,
	payload: pushToken,
});
