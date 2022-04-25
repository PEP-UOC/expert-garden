import { ADD_USER, UPDATE_USER, REMOVE_USER } from './userTypes';
export const addUser = (user) => ({
	type: ADD_USER,
	payload: user,
});
export const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
});
export const removeUser = () => ({
	type: REMOVE_USER,
	payload: '',
});
