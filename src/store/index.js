import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './root/rootReducer';
import userReducer from './user/userReducer';
import changeReducer from './change/changeReducer';
//import serviceReducer from './service/serviceReducer';
//import gardenReducer from './garden/gardenReducer';

import thunk from 'redux-thunk';

import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

//Más información: https://github.com/reduxjs/redux-devtools/tree/main/extension#13-use-redux-devtoolsextension-package-from-npm
//TODO Configuración de producción: https://github.com/reduxjs/redux-devtools/tree/main/extension#14-using-in-production

const mainReducer = combineReducers({
	rootReducer,
	userReducer,
	changeReducer,
	//serviceReducer,
	//gardenReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const composeEnhancers = composeWithDevToolsDevelopmentOnly({ trace: true, traceLimit: 25 });

const rootStore = () => {
	const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
	const persistor = persistStore(store);
	return { store, persistor };
};

export const store = rootStore();
