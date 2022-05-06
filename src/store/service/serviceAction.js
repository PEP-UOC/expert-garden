import {
	ADD_DETAIL,
	UPDATE_DETAIL,
	DELETE_DETAIL,
	RESET_SERVICE_TEMPORAL,
	ADD_DATE,
	UPDATE_DATE,
	DELETE_DATE,
} from './serviceTypes';
export const addDetail = (detail) => ({
	type: ADD_DETAIL,
	payload: detail,
});
export const updateDetail = (detail, index) => ({
	type: UPDATE_DETAIL,
	payload: { detail, index },
});
export const deleteDetail = (id) => ({
	type: DELETE_DETAIL,
	payload: id,
});
export const resetServiceTemporal = () => ({
	type: RESET_SERVICE_TEMPORAL,
	payload: '',
});
export const addDate = (date) => ({
	type: ADD_DATE,
	payload: date,
});
export const updateDate = (date, index) => ({
	type: UPDATE_DATE,
	payload: { date, index },
});
export const deleteDate = (id) => ({
	type: DELETE_DATE,
	payload: id,
});
