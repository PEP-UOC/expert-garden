import { createStore } from 'redux';
import serviceReducer from './serviceReducer';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

console.log('process.env', process.env);

//Más información: https://github.com/reduxjs/redux-devtools/tree/main/extension#13-use-redux-devtoolsextension-package-from-npm
//TODO Configuración de producción: https://github.com/reduxjs/redux-devtools/tree/main/extension#14-using-in-production

const store = createStore(serviceReducer, composeWithDevToolsDevelopmentOnly());

export default store;
