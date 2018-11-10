import React from 'react'
import axios from 'axios'
class ResetPassword extends React.Component {
  state = {
    // profile : {},
    alertMsg : null,
    form : {
      oldPassword:{msg:'',value:''},confirmOldPassword:{msg:'',value:''},newPassword:{msg:'',value:''}}
  }
//   componentDidMount(){
//     let url = 'http://127.0.0.1:8000/api/simple-profile/'+localStorage.getItem('user_id')
// axios.get(url,).then(res=>this.setState({profile:res.data}))
//   }
changeHandler = (e,field)=>{
this.setState({alertMsg:null})
  switch (field) {
    case 'oldPassword':
      this.setState({form:{...this.state.form,oldPassword:{msg:'',value:e.target.value}}})
    break;
    case 'confirmOldPassword':
      this.setState({form:{...this.state.form,confirmOldPassword:{msg:'',value:e.target.value}}})
    break;
    case 'newPassword':
      this.setState({form:{...this.state.form,newPassword:{msg:'',value:e.target.value}}})
    break;


  }
}
emptyValidity = (field)=>{
  console.log('log the field');
  console.log(field);
  let valid = true
  if (this.state.form[field].value == ''){
      valid = false
  }
  return valid
}
matchValidity = ()=>{
  let valid = true
  if (this.state.form.oldPassword.value != this.state.form.confirmOldPassword.value){
    valid = false
  }
  return valid
}
new_LengthPasswordValidity  =()=>{
  let valid = true
  let msg = ''
  if(this.state.form.newPassword.value.length < 8 || this.state.form.newPassword.value.length > 30 ){
    valid  = false
    msg = 'password should be between 8 and 30 character'
  }
  if (valid == true && this.state.form.newPassword.value == this.state.form.oldPassword.value){
    valid  = false
    msg = 'the new password is the same as the old one'
  }
  let payload = {valid:valid,msg:msg}
  return payload
}
resetPassword = ()=>{
  let fields = ['oldPassword','confirmOldPassword','newPassword']
  let generalEmptyValidity = true
  let valid = true
   let form = this.state.form
 fields.map(field=>{
    valid = true
   valid = this.emptyValidity(field)
   if (!valid){
     form[field].msg = 'this field is required'
     this.setState({form:form})
   }
   if (!valid && generalEmptyValidity){
     generalEmptyValidity = false
   }
 })
   if(generalEmptyValidity && valid){
     valid = this.matchValidity()
     if(!valid){
       form['confirmOldPassword'].msg = 'password dont match'
       this.setState({form:form})
     }
   }
   if(valid){
     let payload = this.new_LengthPasswordValidity()
     if(!payload.valid){
       valid = payload.valid
       this.setState({form:{...this.state.form,newPassword:{...this.state.form.newPassword,msg:payload.msg}}})
     }
   }
   if (valid){
     let url = localStorage.getItem('api_url')+'/user/'+localStorage.getItem('user_id')+'/set_password/'
     let data= {old_password:this.state.form.oldPassword.value,new_password:this.state.form.newPassword.value}
     axios.put(url,data).then((res)=>{
      this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/')
     }
     ).catch(err=>this.setState({alertMsg:{valid: false, msg: "invalid password"}}))

   }

   }




  render(){
    return(
      <div class='container'>

<div class='row'>

<div class='col-lg-8 offset-lg-2  col-sm-12'>
{ this.state.alertMsg ?
  <div class={this.state.alertMsg.valid ? 'alert alert-success': 'alert alert-danger'} role="alert">
  <center>{this.state.alertMsg.msg}</center>
</div> : null }
<div class="form-group row ">
  <label for="oldPassword" class="col-sm-4 col-form-label">Old Password</label>
   <div class="col-sm-8">
    <input type="password" class={this.state.form.oldPassword.msg ? 'form-control is-invalid' : 'form-control'} id="oldPassword" placeholder="Old Password" value={this.state.form.oldPassword.value} onChange={(e)=>this.changeHandler(e,'oldPassword')} />
    <div class="invalid-feedback">
          {this.state.form.oldPassword.msg}
    </div>
   </div>
</div>
<div class="form-group row">
<label for="confirmOldPassword" class="col-sm-4 col-form-label">Confirm Old Password</label>
<div class="col-sm-8">
<input type="password" class={this.state.form.confirmOldPassword.msg ? 'form-control is-invalid' : 'form-control'} id="confirmOldPassword" placeholder="Old Password" value={this.state.form.confirmOldPassword.value} onChange={(e)=>this.changeHandler(e,'confirmOldPassword')} />
<div class="invalid-feedback">
      {this.state.form.confirmOldPassword.msg}
</div>
</div>
</div>
<div class="form-group row ">
  <label for="newPassword" class="col-sm-4 col-form-label">New Password</label>
  <div class="col-sm-8">
    <input type="password" class={this.state.form.newPassword.msg ? 'form-control is-invalid' : 'form-control'} id="newPassword" placeholder="New Password" value={this.state.form.newPassword.value} onChange={(e)=>this.changeHandler(e,'newPassword')} />
   <div class="invalid-feedback">
          {this.state.form.newPassword.msg}
    </div>
</div>
</div>
<div><center><button class='btn btn-warning' onClick={this.resetPassword}>ResetPassword</button></center></div>
</div>
</div>
</div>    )
  }
}
export default ResetPassword
