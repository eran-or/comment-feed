import React, { Component } from 'react'
import Gravatar from 'react-gravatar'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.popupRef = React.createRef();
  }

  toggleDetails = (id) => {
    this.popupRef.current.classList.toggle("d-none")
  }
  render() {
    const { comment } = this.props
    const { commenter, msg } = comment

    return (
      <div className="mb-2 d-flex">
        <div className="position-relative mr-3" onClick={() => this.toggleDetails(commenter.id)}>
          <Gravatar email={commenter.email} className="rounded"/>
          <div ref={this.popupRef} className="position-absolute gravatar-popup d-none"></div>
        </div>
        <div>
          <strong className="commenter-email">{commenter.email}</strong>
          <div className="msg">{msg}</div>
        </div>
      </div>
    )
  }
}

export default Comment