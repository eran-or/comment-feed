import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TransitionGroup} from 'react-transition-group';
import Comments from './Comments'
import {setComments} from '../redux/actions/comments'
import {sortLastActive} from '../utils'
import FormContainer from './FormContainer'

class Home extends Component {
  state = {
    comments:undefined,
    selected:undefined
  }

  constructor(props){
    super(props)
    this.filterInput = React.createRef()
    document.body.addEventListener('update',  (e) => {
      //update the filtered comments when user add new comment
       this.filterByEmail(this.filterInput.current)
    }, false);
  }
  
  filterByEmail = (e)=>{
      let {comments} = this.props
      const str = e.target?e.target.value:e.value
      const selected = comments.filter(c=> c.email.includes(str))
      comments = (str !== '')? selected : comments
      this.setState({comments})
  }

  render(){
    const {setComments, lastActiveComment} = this.props
    const comments = this.state.comments || this.props.comments
    
    comments.map(c=>{
      c.isActive = (c._id === lastActiveComment)? true : false 
      return c
    })

    return(
      <div className="container comment-container">
        <FormContainer comments={this.props.comments} setComments={setComments} />
        <div className="py-3 px-2">
          <input type="text" ref={this.filterInput} onKeyUp={this.filterByEmail} placeholder="Filter" className="form-control mb-4" />
          <TransitionGroup className="comment-list">
          <Comments comments={comments}/>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  comments: sortLastActive(state.comments),
  lastActiveComment: state.lastActiveComment
})

const mapDispatchToProps = (dispatch)=>({
  setComments: comments => dispatch(setComments(comments))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)