import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TransitionGroup} from 'react-transition-group';
import Comments from './Comments'
import {setComments} from '../redux/actions/comments'
import {sortLastActive} from '../utils'
import FormContainer from './FormContainer'

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

  

  render(){
    const {setComments, lastActiveComment} = this.props
    let comments = this.state.comments || this.props.comments
    comments.map(c=>{
      if(c._id === lastActiveComment){
        c.isActive = true
      }else{
        c.isActive = false
      }
      return c
    })
    return(
      <div className="container comment-container">
        <FormContainer comments={comments} setComments={setComments} />
        <div className="commenters-container py-3 px-2">
          <input type="text" onKeyUp={this.filterByEmail} placeholder="Filter" className="form-control mb-4" />
          <TransitionGroup className="comment-list">
          <Comments comments={comments}/>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  comments: sortLastActive(state.comments),
  lastActiveComment: state.lastActiveComment
})
const mapDispatchToProps = (dispatch)=>({
  setComments: comments => dispatch(setComments(comments))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)