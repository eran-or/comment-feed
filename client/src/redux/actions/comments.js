
import { createActions } from 'redux-actions'

export const { setComments, setActiveCommentRef } = createActions({
  'SET_COMMENTS': comments => ({ comments }),
  'SET_ACTIVE_COMMENT_REF': ref => ({ ref })
})

