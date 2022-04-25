import {
	ADD_USER,
	REMOVE_USER,
	REMOVE_USER_TEMPORAL,
	UPDATE_USER,
	UPDATE_USER_CHANGES_TO_SAVE,
	UPDATE_USER_HAS_NOT_SAVED_CHANGES,
} from './userTypes';

const initialState = {
	user: false,
	changesToSave: false,
	hasNotSavedChanges: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				user: action.payload,
				hasNotSavedChanges: false,
			};
		case REMOVE_USER:
			return {
				...state,
				user: false,
				hasNotSavedChanges: false,
			};
		case REMOVE_USER_TEMPORAL:
			return {
				...state,
				changesToSave: false,
				hasNotSavedChanges: false,
			};
		case UPDATE_USER:
			return {
				...state,
				user: {
					...state.user,
					...action.payload,
				},
				hasNotSavedChanges: false,
			};
		case UPDATE_USER_CHANGES_TO_SAVE:
			return {
				...state,
				changesToSave: {
					...state.changesToSave,
					...action.payload,
				},
				hasNotSavedChanges: false,
			};
		case UPDATE_USER_HAS_NOT_SAVED_CHANGES:
			return {
				...state,
				hasNotSavedChanges: true,
			};
		default:
			return state;
	}
};
export default userReducer;
