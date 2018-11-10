import React from 'react'
import axios from 'axios'
import Highlight from 'react-highlight'
import CommentModel from './CommentModel'
import MetaTags from 'react-meta-tags';

class Doc extends React.Component {
state = {
  documentation : null
}
componentDidMount(){
  let url = localStorage.getItem('api_url')+'/documentation/'+this.props.match.params.slug+'/'
  axios.get(url).then((res)=>{
  this.setState({documentation:res.data})
  })
}
addComment = (content)=>{

 if(localStorage.getItem('token')){
    if (content != ''){
  let documentation = this.state.documentation
  let form  = {content:content}
  let url = localStorage.getItem('api_url')+'/comment/?doc_id='+documentation.id
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  console.log(config);
  console.log(form);
  axios.post(url,form,config).then(res=>{
    documentation.comments.unshift(res.data)
    this.setState({documentation:documentation})
  }).catch(err=>console.log(err))
}}else{
  this.props.history.push('/')
}
}
deleteComment = (idxC)=>{

  let documentation = this.state.documentation
  let comment_id = documentation.comments[idxC].id
  let url = localStorage.getItem('api_url')+'/comment/'+comment_id+'/'
  axios.delete(url).then(res=>{
    documentation.comments.splice(idxC,1)
    this.setState({documentation:documentation})
  })
}

toogleCommentLike = (idx)=>{
  if(localStorage.getItem('token')){
  let documentation = this.state.documentation
  let comment_id = documentation.comments[idx].id
  let url = localStorage.getItem('api_url')+'/comment/'+comment_id+'/toogle_like/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.put(url,null,config).then(res=>{
    console.log(res.data);
    if(res.data.likes){
          documentation.comments[idx].likes = res.data.likes
          this.setState({documentation:documentation})
    }

  }).catch(err=>console.log(err))
}else{
  this.props.history.push('/')
}
}
toogleCommentToUpdate = (idx)=>{
  let documentation = this.state.documentation
  documentation.comments[idx]['update'] = true
  documentation.comments[idx]['updatedValue'] = documentation.comments[idx].content
  this.setState({documentation:documentation})
}

forgetCommentUpdate = (idx)=>{
  let documentation = this.state.documentation
  documentation.comments[idx]['update'] = false
  this.setState({documentation:documentation})
}

changeUpdatedValue = (e,idx)=>{
  let documentation = this.state.documentation
  documentation.comments[idx]['updatedValue']  = e.target.value
  this.setState({documentation:documentation})
}

UpdateComment = (idx)=>{
  let documentation = this.state.documentation
  let newContent = documentation.comments[idx]['updatedValue']
  let oldContent = documentation.comments[idx].content
  if (newContent && newContent != '' && newContent!=oldContent){
      let comment_id = documentation.comments[idx].id
      let form = {content:newContent}
      let url = localStorage.getItem('api_url')+'/comment/'+comment_id+'/update_comment/'
      let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
      axios.post(url,form,config).then(res=>{
      documentation.comments[idx].content = newContent
      documentation.comments[idx]['update'] = false
       this.setState({documentation:documentation})
     }).catch(err=>console.log(err))
  }
  else if (newContent == oldContent){
    documentation.comments[idx]['update'] = false
     this.setState({documentation:documentation})
  }
}

//  ======================================================================

addCommentResponse = (idx)=>{
    if(localStorage.getItem('token')){
  let content = this.state.documentation.comments[idx].resValue
  if (content && content != ''){
  let documentation = this.state.documentation
  let comment_id = documentation.comments[idx].id
  let form  = {content:content}
  let url = localStorage.getItem('api_url')+'/comment-response/?comment_id='+comment_id
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.post(url,form,config).then(res=>{
    documentation.comments[idx].responses.push(res.data)
    this.state.documentation.comments[idx].resValue = ''
    this.setState({documentation:documentation})
  }).catch(err=>console.log(err))
}
}else{
  this.props.history.push('/')
}
}

deleteResComment = (idxC,idxR)=>{
  let documentation = this.state.documentation
  let comment_res_id = documentation.comments[idxC].responses[idxR].id
  let url = localStorage.getItem('api_url')+'/comment-response/'+comment_res_id+'/'
  axios.delete(url).then(res=>{
    documentation.comments[idxC].responses.splice(idxR,1)
    this.setState({documentation:documentation})
  })
}

toogleResCommentLike = (idxC,idxR)=>{
    if(localStorage.getItem('token')){
  let documentation = this.state.documentation
  let comment_res_id = documentation.comments[idxC].responses[idxR].id
  let url = localStorage.getItem('api_url')+'/comment-response/'+comment_res_id+'/toogle_like/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.put(url,null,config).then(res=>{
    console.log(res.data);
    if(res.data.likes){
          documentation.comments[idxC].responses[idxR].likes = res.data.likes
          this.setState({documentation:documentation})
    }

  }).catch(err=>console.log(err))
}else{
  this.props.history.push('/')
}
}

UpdateCommentResponse = (idxC,idxR)=>{
  let documentation = this.state.documentation
  let newContent = documentation.comments[idxC].responses[idxR]['resValue']
  let oldContent = documentation.comments[idxC].responses[idxR].content
  if (newContent && newContent != '' && newContent!=oldContent){
      let comment_id = documentation.comments[idxC].responses[idxR].id
      let form = {content:newContent}
      let url = localStorage.getItem('api_url')+'/comment-response/'+comment_id+'/update_res_comment/'
      let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
      axios.post(url,form,config).then(res=>{
      documentation.comments[idxC].responses[idxR].content = newContent
      documentation.comments[idxC].responses[idxR]['update'] = false
       this.setState({documentation:documentation})
     }).catch(err=>console.log(err))
  }
  else if(newContent == oldContent){
    documentation.comments[idxC].responses[idxR]['update'] = false
    this.setState({documentation:documentation})
  }
}
toogleResComment = (idx)=>{
  let documentation = this.state.documentation
if(!documentation.comments[idx]['showRes']){
  documentation.comments[idx]['showRes'] = true
}
else {
  documentation.comments[idx]['showRes'] = !documentation.comments[idx]['showRes']
}
this.setState({documentation:documentation})
}

toogleResCommentToUpdate = (idxC,idxR)=>{
  let documentation = this.state.documentation
  documentation.comments[idxC].responses[idxR]['update'] = true
  documentation.comments[idxC].responses[idxR]['resValue'] = documentation.comments[idxC].responses[idxR].content
  this.setState({documentation:documentation})
}

forgetResCommentUpdate = (idxC,idxR)=>{
  let documentation = this.state.documentation
  documentation.comments[idxC].responses[idxR]['update'] = false
  this.setState({documentation:documentation})
}

changeUpdatedResValue = (e,idxC,idxR)=>{
  let documentation = this.state.documentation
  documentation.comments[idxC].responses[idxR]['resValue']  = e.target.value
  this.setState({documentation:documentation})
}


changeResValue = (e,idx)=>{
  let documentation = this.state.documentation
  documentation.comments[idx]['resValue']  = e.target.value
  this.setState({documentation:documentation})
}

checkLiked = (likes)=>{
 let user_id = localStorage.getItem('user_id')
 for( let user in likes ){
   if(likes[user].id == user_id){
     return true
     break ;
}
 }
}
render(){

return(
  <div>
  { this.state.documentation ?
    <div>
    <MetaTags>
                <title>{"Doc's "+this.state.documentation.slug}</title>
                <meta name="description" content={this.state.documentation.breif}/>
                <meta property="og:title" content={this.state.documentation.slug} />
                <meta property="og:image" content={this.state.documentation.image} />
          </MetaTags>
  <div class='row' style={{marginTop:'100px',marginBottom:'50px'}}>
    <div class='col-lg-12'>

        <div>
          <center><img class='img-fluid' src={this.state.documentation.image}/></center>
          <br/>
        <Highlight innerHTML={true} >{this.state.documentation.description}</Highlight>
        </div>
    </div>
    </div>
    <CommentModel comments={this.state.documentation.comments}
                  addComment={this.addComment}
                  deleteComment={this.deleteComment}
                  toogleCommentLike={this.toogleCommentLike}
                  toogleResCommentLike = {this.toogleResCommentLike}
                  addCommentResponse = {this.addCommentResponse}
                  deleteResComment={this.deleteResComment}
                  toogleResComment = {this.toogleResComment}
                  changeResValue = {this.changeResValue}
                  changeUpdatedResValue = {this.changeUpdatedResValue}
                  toogleResCommentToUpdate = {this.toogleResCommentToUpdate}
                  forgetResCommentUpdate = {this.forgetResCommentUpdate}
                  UpdateCommentResponse = {this.UpdateCommentResponse}
                  changeUpdatedValue = {this.changeUpdatedValue}
                  toogleCommentToUpdate = {this.toogleCommentToUpdate}
                  forgetCommentUpdate = {this.forgetCommentUpdate}
                  UpdateComment = {this.UpdateComment}
                  checkLiked = {this.checkLiked}
                   />
  </div>: <div class='text-muted' style={{marginTop:'20%'}}><center><h4>loading ... </h4></center></div> }

  </div>
)
}


}

export default Doc
