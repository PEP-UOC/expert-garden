import { ADD_DETAIL, DELETE_DETAIL, RESET_SERVICE_TEMPORAL } from './serviceTypes';
export const addDetail = (detail) => ({
	type: ADD_DETAIL,
	payload: detail,
});
export const deleteDetail = (id) => ({
	type: DELETE_DETAIL,
	payload: id,
});
export const resetServiceTemporal = () => ({
	type: RESET_SERVICE_TEMPORAL,
	payload: '',
});
