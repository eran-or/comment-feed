import { handleActions } from 'redux-actions'
import {setComments} from '../actions/comments'

const defaultState = {};
export default handleActions({
  [setComments]: (state, { payload: {comments} }) => Object.assign({},state,{comments})
}, defaultState);