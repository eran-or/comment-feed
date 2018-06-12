
import { createActions } from 'redux-actions'

export const { setComments } = createActions({
  'SET_COMMENTS': comments => ({ comments })
})
