import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RSAA } from 'redux-api-middleware'
import configureStore from './redux/store'
import AppRouter from './routers/AppRouter'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {setComments} from './redux/actions/comments'

const store = configureStore()

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
const fetchComments = () => {
  return {
    [RSAA]: {
      endpoint: 'api/comments.json',
      method: 'GET',
      types: [
        'REQUEST',
        {
          type: 'SUCCESS',
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              // Just making sure res.json() does not raise an error
              return res.json().then((json) => {
                store.dispatch(setComments(json))
                ReactDOM.render(app, document.getElementById('root'))
                registerServiceWorker()
              });
            }
          }
        },
        'FAILURE'
      ]
    }
  }
   
}

store.dispatch(fetchComments())