import { ADD_DETAIL, DELETE_DETAIL } from './serviceTypes';
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
		default:
			return state;
	}
};
export default serviceReducer;
