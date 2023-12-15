// import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
// import { applyMiddleware, createStore, Middleware, Dispatch, AnyAction, Store } from 'redux';
// import rootSaga from './sagas';
// import rootReducer, { RootState } from './reducers';
// import { createLogger } from 'redux-logger';

// const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

// const createLog: Middleware<{}, any, Dispatch<AnyAction>> = createLogger({
//     collapsed: false,
//     duration: false,
//     timestamp: false,
//     stateTransformer: (state: any) => state,
//     actionTransformer: (action: any) => action && action.payload ? { ...action, payload: action.payload } : action,
// });

// let middleware: Array<Middleware<{}, any, Dispatch<AnyAction>>> = [sagaMiddleware];

// if (process.env.NODE_ENV === 'development') {
//     middleware = [...middleware, createLog];
// }

// const store: Store<RootState> = createStore(rootReducer, applyMiddleware(...middleware));

// sagaMiddleware.run(rootSaga);

// export default store;




import { createStore, applyMiddleware, compose, Middleware, Dispatch, AnyAction, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer, { RootState } from './reducers';
import rootSaga from './sagas';
import { createLogger } from 'redux-logger';

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

const createLog: Middleware<{}, any, Dispatch<AnyAction>> = createLogger({
    collapsed: true,
    duration: false,
    timestamp: false,
    stateTransformer: (state: any) => state,
    actionTransformer: (action: any) => action && action.payload ? { ...action, payload: action.payload } : action,
});

let middleware: Array<Middleware<{}, any, Dispatch<AnyAction>>> = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, createLog];
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<RootState> = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
