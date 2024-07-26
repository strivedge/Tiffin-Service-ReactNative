import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// eslint-disable-next-line import/prefer-default-export
export function configureStore() {
  const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
