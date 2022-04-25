import { ADD_USER, UPDATE_USER, REMOVE_USER } from './userTypes';

const initialState = {
	user: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				user: action.payload,
				thereAreNotSavedChanges: false,
			};
		case UPDATE_USER:
			return {
				...state,
				user: {
					...state.user,
					...action.payload,
				},
				thereAreNotSavedChanges: false,
			};
		case REMOVE_USER:
			return {
				...state,
				user: false,
				thereAreNotSavedChanges: false,
			};
		default:
			return state;
	}
};
export default userReducer;
