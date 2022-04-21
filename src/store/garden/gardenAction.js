import {
	REMOVE_GARDEN_TEMPORAL,
	UPDATE_GARDEN_TEMPORAL,
	UPDATE_GARDEN_HAS_NOT_SAVED_CHANGES,
} from './gardenTypes';
export const removeGardenTemporal = () => ({
	type: REMOVE_GARDEN_TEMPORAL,
	payload: '',
});
export const updateGardenTemporal = (gardenTemporal) => ({
	type: UPDATE_GARDEN_TEMPORAL,
	payload: gardenTemporal,
});
export const updateHasNotSavedChanges = () => ({
	type: UPDATE_GARDEN_HAS_NOT_SAVED_CHANGES,
	payload: true,
});
