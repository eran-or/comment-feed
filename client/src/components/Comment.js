import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import moment from 'moment'
import { Transition } from 'react-transition-group'
import { setActiveComment } from '../redux/actions/comments'

class Comment extends Component {

  defaultStyle = {
    transition: "opacity 200ms ease-in-out",
  }
  transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 }
  }

  state = {
    stage: "entering",
    active: false,
    styles: {
      ...this.defaultStyle
    }
  }

  render() {
    const { comment, setActiveComment, active } = this.props
    const { email, msg, _id, lastActive } = comment
    return (
      <div className="mb-2 d-flex position-relative">

        <Transition style={this.state.styles} key={_id} in={active} timeout={200} id={_id} className={`position-absolute gravatar-popup ${this.state.active ? '' : 'd-none'}`}
          onEnter={() => {
            this.setState({ active: true })
          }}
          onEntering={() => {
            this.setState({ styles: { ...this.state.styles, ...this.transitionStyles["entering"] } })

          }}
          onEntered={() => {
            this.setState({ styles: { ...this.state.styles, ...this.transitionStyles["entered"] } })

          }}
          onExiting={() => {
            this.setState({ styles: { ...this.state.styles, ...this.transitionStyles["exiting"] } })
          }}
          onExited={() => {
            this.setState({ active: false })
          }}
        >
          <div>
            <div>{email}</div>
            <div>last Active: {moment(lastActive).fromNow()}</div>
          </div>
        </Transition>
        <div className={`mr-3`} onClick={() => setActiveComment(_id)}>
          <Gravatar email={email} className="rounded" />
        </div>
        <div className="commenter">
          <strong className="email">{email}</strong>
          <div className="msg">{msg}</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveComment: (id) => dispatch(setActiveComment(id))
  }
}
export default connect(null, mapDispatchToProps)(Comment)