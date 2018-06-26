import React from 'react'
import { Icon } from 'react-icons-kit'
import {iosSearchStrong} from 'react-icons-kit/ionicons/iosSearchStrong'

const CommentForm = (props)=>{
    const {errorMessage, msg, email, handleSubmit, handleChange} = props
    return(
      <form onSubmit={handleSubmit} className="form d-flex flex-column flex-end">
      <div style={{ color: '#b1b1b1' }} className="d-flex mb-3 bg-white border" >
        <Icon size="24" icon={iosSearchStrong} />
        <input required onChange={handleChange} name="email" type="email" className="pl-1 border-0 form-control" placeholder="Email" value={email}/>
        </div>
        <textarea required spellCheck onChange={handleChange}  name="msg" id="" cols="30" rows="5" placeholder="Message" className="form-control mb-2" value={msg}></textarea>
        <div className="d-flex flex-row-reverse">
          <input type="submit" className="btn btn-submit col-4 mb-2" />
        </div>
        {errorMessage&&<div className="alert alert-danger">{errorMessage}</div>}
      </form>
    )
}

export default CommentForm