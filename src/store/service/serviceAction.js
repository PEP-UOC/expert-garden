import { ADD_DETAIL, DELETE_DETAIL } from './serviceTypes';
export const addDetail = (detail) => ({
	type: ADD_DETAIL,
	payload: detail,
});
export const deleteDetail = (id) => ({
	type: DELETE_DETAIL,
	payload: id,
});
