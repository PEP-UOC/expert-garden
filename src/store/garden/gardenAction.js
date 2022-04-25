import { UPDATE_GARDEN_TEMPORAL, REMOVE_GARDEN_TEMPORAL } from './gardenTypes';
export const updateGardenTemporal = (gardenTemporal) => ({
	type: UPDATE_GARDEN_TEMPORAL,
	payload: gardenTemporal,
});
export const removeGardenTemporal = () => ({
	type: REMOVE_GARDEN_TEMPORAL,
	payload: '',
});
