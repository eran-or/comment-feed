import React, {Component} from 'react'
import {connect} from 'react-redux'
import CommentForm from './CommentForm'
import Comments from './Comments'
import {setComments} from '../redux/actions/comments'
import {sortLastActive} from '../utils'

class Home extends Component {
  state = {
    comments:undefined
  }
  
  filterByEmail = (e)=>{
      const {comments} = this.props
      const str = e.target.value
      const selected = comments.filter(c=> c.email.includes(str))
      
      if(str !== ''){
        this.setState({comments:selected})
      }else{
        this.setState({comments:undefined})
      }
  }

  handleSubmit = (email, msg) =>{
    
   fetch('/comments',{
    method: 'POST',
    body: JSON.stringify({email,msg}),
    headers: {
      'content-type': 'application/json'
    }
   }).then(res=>res.json()).then(json=>{
    const {comments, setComments} = this.props
    let errorMessage, reset;
    if(json.error){
      errorMessage = json.error.errors.email.message
      reset = false
    }else{
      const {_id, createdAt} = json.createdComment
      reset = true
      errorMessage = undefined
      const lastActive = new Date()
      const newComments = [{_id, email, msg, createdAt}, ...comments].map((c)=>c.lastActive = lastActive)
      setComments(newComments)
    }
    this.setState({errorMessage, reset})
    }).catch(err=>console.log("error:", err))
  }

  render(){
    const comments = this.state.comments || this.props.comments
    return(
      <div className="container comment-container">
        <CommentForm handleSubmit={this.handleSubmit} errorMessage={this.state.errorMessage} reset={this.state.reset} />
        <div className="commenters-container py-3 px-2">
          <input type="text" onKeyUp={this.filterByEmail} placeholder="Filter" className="form-control mb-4" />
          <Comments comments={comments}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  comments: sortLastActive(state.comments)
})
const mapDispatchToProps = (dispatch)=>({
  setComments: comments => dispatch(setComments(comments))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)