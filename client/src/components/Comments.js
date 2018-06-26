import React from 'react'
import Comment from './Comment'
const Comments = (props) => {
  const {comments} = props
  return <div>
      {comments && comments.map(c => (
          <Comment active={c.isActive} comment={c} key={c._id} />
      ))}
  </div>
}
// class Comments extends Component {

//   constructor(props){
//     super(props)
//     this.commentListRef = React.createRef()
//   }
  
//   // toggleDetails = (id) => {

//   //   const { lastActiveComment, setActiveComment } = this.props
//   //   const current = this.commentRef.current
//   //   current.classList.remove('d-none')
//   //   setTimeout(() => {
//   //     if (lastActiveCommentRef) {
//   //       if (lastActiveComment !== id) {
//   //         const el = lastActiveComment
//   //         el.classList.remove("show")
//   //         current.classList.add("show")
//   //         setActiveCommentRef({ id, ref: current })
//   //       } else {
//   //         current.classList.toggle("show")
//   //       }
//   //     } else {
//   //       current.classList.toggle("show")
//   //       setActiveCommentRef({ id, ref: current })
//   //     }
//   //   }, 0)
//   // }

//   // componentDidMount(){
//   //   this.commentListRef.current.addEventListener("transitionend", function(e){
//   //     if(!e.target.classList.contains('show')){
//   //       e.target.classList.add("d-none")
//   //     }
//   //     },true)
//   // }
//   render() {
//     const { comments } = this.props
    
//     return (
//       <div ref={this.commentListRef} id="eran">
//         {/* <TransitionGroup className="comment-list">
//         {comments && comments.map(c =>(
//           <CSSTransition
//           key={c._id}
//           timeout={100}
//           classNames="fade"
//         >
//           <Comment comment={c} />
//           </CSSTransition>))}
//         </TransitionGroup> */}
//         {/* <TransitionGroup timeout={100} component={null} className="comment-list"> */}
//         {comments && comments.map(c => (<Comment active={isActive} comment={c} key={c._id} />) )}
//         {/* </TransitionGroup> */}
//       </div>
//     )
//   }
// }

export default Comments