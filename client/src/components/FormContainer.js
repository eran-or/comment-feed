import React, {Component} from 'react'
import CommentForm from './CommentForm'

const update = new Event('update');
export default class FormContainer extends Component {
  state = {
    errorMessage:undefined,
    email:'',
    msg:''
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const {email,msg} = this.state
    fetch('/comments',{
     method: 'POST',
     body: JSON.stringify({email,msg}),
     headers: {
       'content-type': 'application/json'
     }
    }).then(res=>res.json()).then(json=>{
     const {comments, handleUpdate} = this.props
     let errorMessage;
     if(json.error){
       errorMessage = json.error.errors.email.message
     }else{
       const {_id, createdAt} = json.createdComment
       errorMessage = undefined
       const lastActive = new Date()
       const newComments = [{_id, email, msg, createdAt}, ...comments].map((c)=>{
         c.lastActive = lastActive
         return c
       })
       handleUpdate(newComments)
     }
     this.setState({errorMessage, msg:errorMessage?msg:'', email:errorMessage?email:''})
     }).catch(err=>console.log("error:", err))
   }
   
  handleChange = (e) => {
    const target = e.target.name
    const value = e.target.value
    this.setState({[target]:value})
  }

  render(){
    return <CommentForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} {...this.state} />
  }
}