import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { RSAA } from 'redux-api-middleware'
import {setComments} from './redux/actions/comments'

import registerServiceWorker from './registerServiceWorker'
import AppRouter from './routers/AppRouter'

const store = configureStore()

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
const fetchComments = () => {
  console.log(window.location.hostname)
  return {
    [RSAA]: {
      endpoint: '/comments',
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
                const comments = json.comments.reverse()
                console.log(comments)
                store.dispatch(setComments(comments))
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