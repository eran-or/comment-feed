import { handleActions } from 'redux-actions'
import {setComments, setActiveCommentRef} from '../actions/comments'

const defaultState = {};
export default handleActions({
  [setComments]: (state, { payload: {comments} }) => Object.assign({},state,{comments}),
  [setActiveCommentRef]: (state, { payload: {ref} }) => Object.assign({},state,{lastActiveCommentRef:ref})
}, defaultState);