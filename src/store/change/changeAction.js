import { UPDATE_CHANGES_TO_SAVE, REMOVE_CHANGES_TO_SAVE } from './changeTypes';
export const updateChangesToSave = (changesToSave, thereAreNotSavedChanges) => ({
	type: UPDATE_CHANGES_TO_SAVE,
	payload: { changesToSave, thereAreNotSavedChanges },
});
export const removeChangesToSave = () => ({
	type: REMOVE_CHANGES_TO_SAVE,
	payload: {},
});
