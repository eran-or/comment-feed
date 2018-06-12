import React, {Component} from 'react'
import {connect} from 'react-redux'
import CommentForm from './CommentForm'
import Comments from './Comments'

class Home extends Component {
  state = {
    comments:undefined
  }
  filterByEmail = (e)=>{
      const {comments} = this.props
      
      const str = e.target.value
      const selected = comments.filter(c=> c.commenter.email.includes(str))
      
      if(str !== ''){
        this.setState({comments:selected})
      }else{
        this.setState({comments:undefined})
      }
  }

  render(){
    const comments = this.state.comments || this.props.comments

    return(
      <div className="container comment-container">
        <CommentForm />
        <div className="commenters-container py-3 px-2">
          <input type="text" onKeyUp={this.filterByEmail} placeholder="Filter" className="form-control mb-4" />
          <Comments comments={comments}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  comments: state.comments
})
export default connect(mapStateToProps)(Home)