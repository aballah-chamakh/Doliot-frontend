import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class ResetName extends React.Component {
state ={
  username : {val:'',msg:''}
}

changeHandler = (e)=>{
  this.setState({username:{val:e.target.value,msg:''}})
}
reset = ()=>{
  if (this.state.username.val.length > 0 ){
  let url = localStorage.getItem('api_url')+'/profile/'+localStorage.getItem('profile_slug')+'/reset_name/'
  let data = {'username':this.state.username.val}
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.put(url,data,config).then((res)=>{
    localStorage.setItem('username',data.username)
    this.props.reloadProfile()
    this.setState({username:{val:'',msg:''}})
  })}else{
    this.setState({username:{val:'',msg:'this field is required'}})
  }
}
render(){
  return(
    <div class='row'>
    <div class='col-lg-6 offset-lg-3  col-sm-12'>
   <div class='form-group row'>

     <label class="col-sm-2 col-form-label" >Username</label>
       <div class="col-sm-10">
     <input  value={this.state.username.val} class={this.state.username.msg.length > 0 ? ' form-control is-invalid' : 'form-control'} onChange={this.changeHandler}/>
     <div class="invalid-feedback">
           {this.state.username.msg}
     </div>
     </div>
   </div>
   <center><button class='btn btn-warning' onClick={this.reset}>reset username</button></center>
   </div>
    </div>
  )
}

}
export default ResetName
