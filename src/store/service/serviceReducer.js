import {
	ADD_DETAIL,
	UPDATE_DETAIL,
	DELETE_DETAIL,
	RESET_SERVICE_TEMPORAL,
	ADD_DATE,
	UPDATE_DATE,
	DELETE_DATE,
} from './serviceTypes';
const initialState = {
	serviceTemporal: {
		details: [],
		dates: [],
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
					details: [...details],
				},
			};
		}
		case UPDATE_DETAIL: {
			let details = state.serviceTemporal.details;
			details[action.payload.index] = action.payload.detail;

			return {
				...state,
				serviceTemporal: {
					...state.serviceTemporal,
					details: [...details],
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
					dates: [],
				},
			};
		case ADD_DATE: {
			let dates = state.serviceTemporal.dates;
			dates.push(action.payload);

			return {
				...state,
				serviceTemporal: {
					...state.serviceTemporal,
					dates: [...dates],
				},
			};
		}
		case UPDATE_DATE: {
			let dates = state.serviceTemporal.dates;
			dates[action.payload.index] = action.payload.date;

			return {
				...state,
				serviceTemporal: {
					...state.serviceTemporal,
					dates: [...dates],
				},
			};
		}
		case DELETE_DATE:
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
