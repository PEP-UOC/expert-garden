import {
  SET_LOGGED_IN,
  SET_VALIDATING_MESSAGE,
  SET_LOADING_MESSAGE,
  SET_ERROR_MESSAGE,
} from './rootTypes';
import Constants from 'expo-constants';

const initialState = {
  isLoggedIn: false,
  validatingMessage: false,
  loadingMessage: Constants.manifest.extra.debug ? false : false,
  errorMessage: false,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_VALIDATING_MESSAGE:
      return {
        ...state,
        validatingMessage: action.payload,
      };
    case SET_LOADING_MESSAGE:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
