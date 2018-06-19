import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {

  render() {
    const { comments } = this.props
    return (
      <div>
        {comments && comments.map(c => <Comment comment={c} key={c._id} />)}
      </div>
    )
  }
}

export default Comments