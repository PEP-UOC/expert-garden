import {
	ADD_USER,
	REMOVE_USER,
	REMOVE_USER_TEMPORAL,
	UPDATE_USER,
	UPDATE_USER_CHANGES_TO_SAVE,
	UPDATE_USER_HAS_NOT_SAVED_CHANGES,
} from './userTypes';
export const addUser = (user) => ({
	type: ADD_USER,
	payload: user,
});
export const removeUser = () => ({
	type: REMOVE_USER,
	payload: '',
});
export const removeChangesToSave = () => ({
	type: REMOVE_USER_TEMPORAL,
	payload: '',
});
export const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
});
export const updateChangesToSave = (changesToSave) => ({
	type: UPDATE_USER_CHANGES_TO_SAVE,
	payload: changesToSave,
});
export const updateHasNotSavedChanges = () => ({
	type: UPDATE_USER_HAS_NOT_SAVED_CHANGES,
	payload: true,
});
