import React, {Component} from 'react'

class CommentForm extends Component{
  handleSubmit=(e)=>{
    e.preventDefault();
    console.log("handle submit")
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} className="form d-flex flex-column flex-end">
        <input type="email" className="form-control mb-3" placeholder="Email" />
        <textarea name="" id="" cols="30" rows="5" placeholder="Message" className="form-control mb-2" ></textarea>
        <div className="d-flex flex-row-reverse">
          <input type="submit" className="btn btn-submit col-4 mb-2" />
        </div>
      </form>
    )
  }
}

export default CommentForm