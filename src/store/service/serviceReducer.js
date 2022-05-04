import { ADD_DETAIL, DELETE_DETAIL, RESET_SERVICE_TEMPORAL } from './serviceTypes';
const initialState = {
	serviceTemporal: {
		details: [],
	},
};
const serviceReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_DETAIL: {
			let details = state.serviceTemporal.details;
			details.push(action.payload);

			return {
				...state,
				serviceTemporal: {
					...state.serviceTemporal,
					details,
				},
			};
		}
		case DELETE_DETAIL:
			return {
				...state,
				serviceTemporal: {
					...state.serviceTemporal,
					details: state.serviceTemporal.details.filter((item) => item.sdid != action.payload),
				},
			};
		case RESET_SERVICE_TEMPORAL:
			return {
				...state,
				serviceTemporal: {
					details: [],
				},
			};
		default:
			return state;
	}
};
export default serviceReducer;
