
import { createActions } from 'redux-actions'

export const { setComments, setActiveComment } = createActions({
  'SET_COMMENTS': comments => ({ comments }),
  'SET_ACTIVE_COMMENT': id => ({id})
})

