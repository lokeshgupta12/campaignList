import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import { rootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export const getStore = () => store;

sagaMiddleware.run(rootSaga);
