import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
import adminReducer from './listReducer';
import profileReducer from './profileReducer';
import jobReducer from './jobReducer';
import applicationReducer from './applicationReducer';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
    loader: loaderReducer,
    auth: authReducer,
    admin: adminReducer,
    profile: profileReducer,
    job: jobReducer,
    apply: applicationReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default persistedReducer;
