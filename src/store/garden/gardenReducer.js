import { UPDATE_GARDEN_TEMPORAL, REMOVE_GARDEN_TEMPORAL } from './gardenTypes';
const initialState = {
	gardenTemporal: false,
};
const gardenReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_GARDEN_TEMPORAL:
			return {
				...state,
				gardenTemporal: {
					...state.gardenTemporal,
					...action.payload,
				},
				hasNotSavedChanges: false,
			};
		case REMOVE_GARDEN_TEMPORAL:
			return {
				...state,
				gardenTemporal: false,
				hasNotSavedChanges: false,
			};
		default:
			return state;
	}
};
export default gardenReducer;
