import { connectRoutes } from 'redux-first-router';
import {
  combineReducers, createStore, applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';
import queryString from 'query-string';

import { createHashHistory } from 'history';
import options from '../routings/options';

import reducers from './index';
import routesMap from '../routings/routesMap';

const { reducer, middleware, enhancer } = connectRoutes(routesMap, {
  ...options,
  createHistory: createHashHistory,
  querySerializer: queryString
});

const rootReducer = combineReducers({ location: reducer, ...reducers });
const middlewares = applyMiddleware(thunk, middleware);
const composeEnhancers = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const store = createStore(rootReducer, composeEnhancers(enhancer, middlewares));

export default store;
