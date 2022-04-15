import { ADD_USER, REMOVE_USER, UPDATE_USER, UPDATE_HAS_NOT_SAVED_CHANGES } from './userTypes';
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
export const removeUser = () => ({
  type: REMOVE_USER,
  payload: '',
});
export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
export const updateHasNotSavedChanges = () => ({
  type: UPDATE_HAS_NOT_SAVED_CHANGES,
  payload: true,
});
