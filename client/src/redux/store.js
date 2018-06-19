
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import commentsReducer from './reducers/comments'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //Store cretion
  const store = createStore(
    commentsReducer,
    composeEnhancers(applyMiddleware(thunk,apiMiddleware))
  )
  return store
}