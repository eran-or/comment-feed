import React, {Component} from 'react'
import { Icon } from 'react-icons-kit'
import {iosSearchStrong} from 'react-icons-kit/ionicons/iosSearchStrong'

class CommentForm extends Component{
  state={
    email:'',
    msg:''
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    const {email, msg} = this.state
    this.props.handleSubmit(email, msg)
  }

  handleChange = (e) => {
    const target = e.target.name
    const value = e.target.value
    this.setState({[target]:value})
  }

  static getDerivedStateFromProps(props, state){
    const {reset} = props
    let newState = null
    if(reset){
      newState = {
        email:'',
        msg:''
      }
    }
    return newState
  }

  render(){
    const {errorMessage} = this.props
    return(
      <form onSubmit={this.handleSubmit} className="form d-flex flex-column flex-end">
      <div style={{ color: '#b1b1b1' }} className="d-flex mb-3 bg-white border" >
        <Icon size="24" icon={iosSearchStrong} />
        <input required onChange={this.handleChange} name="email" type="email" className="pl-1 border-0 form-control" placeholder="Email" value={this.state.email}/>
        </div>
        <textarea required spellCheck onChange={this.handleChange}  name="msg" id="" cols="30" rows="5" placeholder="Message" className="form-control mb-2" value={this.state.msg}></textarea>
        <div className="d-flex flex-row-reverse">
          <input type="submit" className="btn btn-submit col-4 mb-2" />
        </div>
        {errorMessage&&<div>{errorMessage}</div>}
      </form>
    )
  }
}

export default CommentForm