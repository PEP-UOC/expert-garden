import { UPDATE_CHANGES_TO_SAVE, REMOVE_CHANGES_TO_SAVE } from './changeTypes';

const initialState = {
	changesToSave: false,
	thereAreNotSavedChanges: false,
};

const changeReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CHANGES_TO_SAVE:
			return {
				...state,
				changesToSave: {
					...state.changesToSave,
					...action.payload.changesToSave,
				},
				thereAreNotSavedChanges: action.payload.thereAreNotSavedChanges,
			};
		case REMOVE_CHANGES_TO_SAVE:
			return {
				...state,
				changesToSave: false,
				thereAreNotSavedChanges: false,
			};
		default:
			return state;
	}
};
export default changeReducer;
