import { handleActions } from 'redux-actions'
import {setComments, setActiveComment} from '../actions/comments'
//import Immutable from 'immutable'

const defaultState = {};
export default handleActions({
  [setComments]: (state, { payload: {comments} }) => Object.assign({},state,{comments}),
  [setActiveComment]: (state, { payload: {id} }) => Object.assign({},state,{lastActiveComment:id}),
}, defaultState);