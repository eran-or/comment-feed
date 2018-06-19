import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import { setActiveCommentRef } from '../redux/actions/comments'
import moment from 'moment'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.commentRef = React.createRef()
  }

  toggleDetails = (id, email) => {
    
    const { lastActiveCommentRef, setActiveCommentRef } = this.props
    const current = this.commentRef.current
    if(lastActiveCommentRef){
      if (lastActiveCommentRef.id !== id) {
        lastActiveCommentRef.ref.classList.add("d-none")
        current.classList.remove("d-none")
        
        setActiveCommentRef({ id, ref: current })
      } else {
        current.classList.toggle("d-none")
      }
    }else{
      
      current.classList.toggle("d-none")
      setActiveCommentRef({ id, ref: current })
    }
  }
  render() {
    
    const { comment } = this.props
    const { email, msg, _id, lastActive } = comment

    return (
      <div className="mb-2 d-flex position-relative">
        <div id={_id} ref={this.commentRef} className="position-absolute gravatar-popup d-none">
          <div>{email}</div>
          <div>last Active: {moment(lastActive).fromNow()}</div>
        </div>
        <div className={`mr-3`} onClick={() => this.toggleDetails(_id, email)}>
          <Gravatar email={email} className="rounded" />
        </div>
        <div>
          <strong className="commenter-email">{email}</strong>
          <div className="msg">{msg}</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  lastActiveCommentRef: state.lastActiveCommentRef
})
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCommentRef: (ref) => dispatch(setActiveCommentRef(ref))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)