/* ------------------------- External Dependencies -------------------------- */
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, routerActions } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history';
/* ------------------------- Internal Dependencies -------------------------- */
import middlewares from '../departments/middlewares'
import rootReducer from '../departments/reducer'
import sagas from '../departments/sagas'

const history = createHashHistory();

/* ---------------------------- Module Package ------------------------------ */
const configureStore = (initialState, services = {}) => {
  // Redux Configuration
  initialState = {}
  const middleware = [];
  const enhancers = [];

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(...middlewares);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  };
  const composeEnhancers = compose


  // Initalize Sagas
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);
  let sagaTask = sagaMiddleware.run(sagas)


  return store
}

export default { configureStore, history }
