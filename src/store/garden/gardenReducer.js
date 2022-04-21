import {
	REMOVE_GARDEN_TEMPORAL,
	UPDATE_GARDEN_TEMPORAL,
	UPDATE_GARDEN_HAS_NOT_SAVED_CHANGES,
} from './gardenTypes';
const initialState = {
	gardenTemporal: false,
	hasNotSavedChanges: false,
};
const gardenReducer = (state = initialState, action) => {
	switch (action.type) {
		case REMOVE_GARDEN_TEMPORAL:
			return {
				...state,
				gardenTemporal: false,
				hasNotSavedChanges: false,
			};
		case UPDATE_GARDEN_TEMPORAL:
			return {
				...state,
				gardenTemporal: {
					...state.gardenTemporal,
					...action.payload,
				},
				hasNotSavedChanges: false,
			};
		case UPDATE_GARDEN_HAS_NOT_SAVED_CHANGES:
			return {
				...state,
				hasNotSavedChanges: true,
			};
		default:
			return state;
	}
};
export default gardenReducer;
