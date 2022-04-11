import { ADD_SERVICE, DELETE_SERVICE, DID_SERVICE } from './serviceTypes';
const initialState = {
  services: [],
};
const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        services: [
          ...state.services,
          {
            service: action.payload,
            done: false,
            id: Math.random().toString(),
          },
        ],
      };
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter((item) => item.id != action.payload),
      };
    case DID_SERVICE:
      return {
        ...state,
        services: state.services.map((item) => {
          if (item.id != action.payload) {
            return item;
          }
          return {
            ...item,
            done: true,
          };
        }),
      };
    default:
      return state;
  }
};
export default serviceReducer;
