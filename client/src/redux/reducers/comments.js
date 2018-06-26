import { handleActions } from 'redux-actions'
import {setComments, setActiveComment} from '../actions/comments'
//import {Map} from 'immutable'

const defaultState = {};
export default handleActions({
  [setComments]: (state, { payload: {comments} }) => Object.assign({},state,{comments}),
  //[setActiveCommentRef]: (state, { payload: {ref} }) => Object.assign({},state,{lastActiveCommentRef:ref})
  [setActiveComment]: (state, { payload: {id} }) => Object.assign({},state,{lastActiveComment:id}),
}, defaultState);