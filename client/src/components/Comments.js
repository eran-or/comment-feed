import React from 'react'
import Comment from './Comment'
const Comments = (props) => {
  const {comments} = props
  return <div>
      {comments && comments.map(c => (
          <Comment active={c.isActive} comment={c} key={c._id} />
      ))}
  </div>
}

export default Comments