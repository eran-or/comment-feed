import React from 'react'
import Comment from './Comment'

const Comments = (props)=>{
    const {comments} = props

    return(
      <div>
        {comments&&comments.map(c=><Comment comment={c} key={c.id} />)}
      </div>
    )
  
}

export default  Comments