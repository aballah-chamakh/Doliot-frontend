import React from 'react'
import {Link} from 'react-router-dom'

class CommentModel extends React.Component {
  state = {
    comment : {val:'',msg:''},
    subComment : {val:'',msg:''}
  }
  change = (e,field)=>{
    console.log(e.target.value);
    this.setState({comment :{val:e.target.value,msg:''}})
  }
  clear = ()=>{
    this.setState({comment :{val:'',msg:''}})
  }



  render(){
let user_id = localStorage.getItem('user_id')
let endpoint = localStorage.getItem('api_url').replace('/api','')
console.log(endpoint);
    return(
<div style={{marginBottom:'50px'}}>

<div class='row'>
  <div class='col-lg-12' style={{marginBottom:'50px'}}>
         <img style={{"marginBottom":'5px'}} height='50px' width='50px' src={localStorage.getItem('profile_image') ? localStorage.getItem('profile_image') : endpoint+'/media/defaultProfile.png' } />
         <div style={{display:'inline'}}>
         <textarea height='200px' class='form-control' type='text' placeholder={'write a comment ...'}
         onChange={this.change} value={this.state.comment.val} />
         </div>
         <div style={{position:'absolute',marginTop:'5px',right:'15px'}} >
         <button  onClick={()=>{this.props.addComment(this.state.comment.val);this.clear()}} class='btn btn-primary right' >publish</button>
       </div>
  </div>
</div>
{ this.props.comments ?
  <div class='row'>
{this.props.comments.map((comment,idxC)=>{
  return(

<div class='col-lg-12' >

<div style={{position:'absolute',right:'15px',paddingBottom:'10px',color:'grey'}}><small>by <span style={{color:'blue'}}>{comment.user_id == user_id ? <Link to={'/profile/'+comment.profile_slug}>{comment.username}</Link>: comment.username}</span></small></div>
<img style={{"marginBottom":'5px'}} height='50px' width='50px' src={comment.image} />

{ comment.update ?
  <div style={{marginBottom:'40px'}}>
  <textarea class='form-control' value={comment.updatedValue} onChange={(e)=>{this.props.changeUpdatedValue(e,idxC)}}  />
  <br/>
  <div style={{position:'absolute',right:'15px'}}>
  <button class='btn btn-primary' style={{marginRight:'5px'}} onClick={()=>{this.props.forgetCommentUpdate(idxC)}} >forget</button>
  <button class='btn btn-warning' onClick={()=>{this.props.UpdateComment(idxC)}}>save change</button>
  </div>

  </div>
  :<p style={{color:'grey',borderRadius:'25px',padding:'10px',backgroundColor:'#F8F8F8'}}>{comment.content}</p>}

<button  class='btn btn-link' onClick={()=>{this.props.toogleCommentLike(idxC)}} >
<span style={{marginRight:'5px'}} >{comment.likes.length}</span>
<span style={{marginRight:'5px'}}><i class="fas fa-thumbs-up"></i></span>
<span style={{marginRight:'0px'}}>{this.props.checkLiked(comment.likes) ? 'liked' : null}</span>
</button>
<button class='btn btn-link' onClick={()=>{this.props.toogleResComment(idxC)}} style={{ textDecoration: 'none' , display:'inline',marginRight:'5px', paddingRight:'5px' }} >
{comment.responses.length+' reply'}
</button>
{ comment.user_id == user_id ?
  <span>
  <button class='btn btn-link' onClick={()=>{this.props.toogleCommentToUpdate(idxC)}} style={{position:'absolute',right:'15px',borderRadius:'50%'}}><i class="fas fa-user-edit"></i></button>
  <button onClick={()=>{this.props.deleteComment(idxC)}} class='btn btn-link' style={{position:'absolute',right:'45px',borderRadius:'50%'}}><i class="fas fa-trash-alt"></i></button>
  </span>: null
}

<hr/>
{ comment.showRes ?<div>
<div class='row'>
<div class='col-lg-11 offset-1' style={{marginBottom:'50px'}}>
       <img style={{"marginBottom":'5px'}} height='50px' width='50px' src={localStorage.getItem('profile_image') ? localStorage.getItem('profile_image') : endpoint+'/media/defaultProfile.png'} />
       <div >
       <textarea onChange={(e)=>{this.props.changeResValue(e,idxC)}}
       value={comment.resValue} class='form-control' type='text' placeholder='reply ...'
         />
         </div>
       <div  style={{position:'absolute',marginTop:'5px',right:'15px'}} >
       <button  onClick={()=>{this.props.addCommentResponse(idxC)}}  class='btn btn-primary right' >publish</button>
     </div>
</div>
</div>
{ comment.responses.map((comment,idxR)=>{
  return(
    <div class='row' style={{marginBottom:'5px'}} >
      <div class='col-lg-11 offset-1' style={{backgroundColor:'#f2f4f7',borderRadius:'25px',padding:'15px'}}>
      <div style={{position:'absolute',right:'15px',paddingBottom:'10px',color:'grey'}}><small>by <span style={{color:'blue'}}>{comment.user_id == user_id ? <Link to={'/profile/'+comment.profile_slug}>{comment.username}</Link>:comment.username}</span> </small></div>
      <img style={{"marginBottom":'5px'}} class='rounded-circle' height='50px' width='50px' src={comment.image} />
      { comment.update ?
        <div style={{marginBottom:'40px'}}>
        <textarea class='form-control' value={comment.resValue} onChange={(e)=>{this.props.changeUpdatedResValue(e,idxC,idxR)}}  />
        <br/>
         <div  style={{position:'absolute',marginTop:'5px',right:'15px'}} >
        <button class='btn btn-primary' style={{marginRight:'5px'}} onClick={()=>{this.props.forgetResCommentUpdate(idxC,idxR)}}>forget</button>
        <button class='btn btn-warning' onClick={()=>{this.props.UpdateCommentResponse(idxC,idxR)}}>save change</button>
        </div>
        </div>
        :<p style={{color:'grey',borderRadius:'25px',padding:'10px',backgroundColor:'#F8F8F8'}}>{comment.content}</p>}

      <button  class='btn btn-link' style={{textDecoration:'none'}} onClick={()=>{this.props.toogleResCommentLike(idxC,idxR)}}>
        {comment.likes ? <span style={{marginRight:'5px'}}>{comment.likes.length}</span> : null }
        <span style={{marginRight:'5px'}}><i class="fas fa-thumbs-up"></i></span>
        <span >{this.props.checkLiked(comment.likes) ? 'liked' : null}</span>
      </button>
      { comment.user_id == user_id ?
        <span >
        <button onClick={()=>{this.props.toogleResCommentToUpdate(idxC,idxR)}} class='btn btn-link' style={{position:'absolute',right:'15px',borderRadius:'50%'}}><i class="fas fa-user-edit"></i></button>
        <button onClick={()=>{this.props.deleteResComment(idxC,idxR)}} class='btn btn-link' style={{position:'absolute',right:'45px',borderRadius:'50%'}}><i class="fas fa-trash-alt"></i></button>
        </span> : null
      }

    </div>
  </div>
  )
})
}</div> : null }
</div>
  )
})
}
</div> : null }

</div>
    )
  }
}
export default CommentModel  ;
// <div class='col-sm-2'>
// <span class="badge badge-light">9</span>
//    <img height='100px' width='100px' src={localStorage.getItem('image') ? localStorage.getItem('image') : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vBzUckaZqOyIWv4MuIhh6ezah4LTUu8qTPH2kFGpVOJzpPSV'} />
// <span style={{marginRight:'5px'}}><i class="fas fa-thumbs-up"></i></span>
//       <h5 style={{display:'inline',color:'orange'}}>Abdallah</h5>
//          <button class='btn btn-warning right' style={{color:'white',position:'absolute',marginTop:'5px',right:'20px'}}>publish</button>
