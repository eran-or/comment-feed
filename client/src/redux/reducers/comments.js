import { handleActions } from 'redux-actions'
import {setComments, setActiveComment} from '../actions/comments'
import update from 'immutability-helper'

const defaultState = {}
export default handleActions({
  // [setComments]: (state, { payload: {comments} }) => Object.assign({},state,{comments}),
  // [setActiveComment]: (state, { payload: {id} }) => Object.assign({},state,{lastActiveComment:id}),
  [setComments]: (state, { payload: {comments} }) => update(state,{comments:{$set:comments}}),
  [setActiveComment]: (state, { payload: {id} }) => update(state,{lastActiveComment:{$set:id}}),
}, defaultState);