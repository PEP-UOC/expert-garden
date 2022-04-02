import { ADD_SERVICE, DELETE_SERVICE, DID_SERVICE } from "./serviceTypes"
export const addService = (service) => ({
  type: ADD_SERVICE,
  payload: service
})
export const deleteService = (id) => ({
  type: DELETE_SERVICE,
  payload: id
})
export const didService = (id) => ({
  type: DID_SERVICE,
  payload: id
})