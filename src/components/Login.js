import React from 'react' ;
import Input from '../Ui/Input' ;
import { Motion, spring } from "react-motion";
import {withRouter} from 'react-router-dom'
import {ChangeHandler,CheckValidity} from '../Shared/FormFunc' ;
import {connect} from 'react-redux' ;
import axios from 'axios' ;
class Login extends React.Component{
state = {
  error : false ,
  errorText : '',
  form:{
    email : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your email'},
      props : {
        field:'email',
        label:'Email',
        value : '',
        msg:'',
        validators :{required:true,email:true},
        isValid : false,
        classes : 'form-control',

      }
    },
    password : {
      type :'input',
      inputConfig:{type:'password',placeholder:'enter your password'},
      props : {
        field:'password',
        label:'Password',
        value:'',
        msg:'',
        validators :{required:true},
        isValid : false,
        classes : 'form-control',
      }
    }
  }
}
change(event,field){
  if (this.state.error){
  this.setState({error:false})
    this.setState({errorText:false})}
let state = ChangeHandler(event,this.state,field)
this.setState({state:state})

}
valid(){

  let fields = ['email','password']
  fields.map(field=>{
    let payload = CheckValidity(this.state,field)
    if(!payload.isValid){ this.setState({state:payload.state}) }
  })

let emailValidity    = this.state.form.email.props.isValid ;
let passwordValidity = this.state.form.password.props.isValid ;
if (emailValidity && passwordValidity){
let credantial = {email : this.state.form.email.props.value,password:this.state.form.password.props.value}
let url =localStorage.getItem('api_url')+'/token'
axios.post(
url,
credantial,
).then( response => {
  localStorage.setItem('token',response.data.access)
  let newUrl =  localStorage.getItem('api_url')+'/user/get_user_info/'
  let config =  {headers: {Authorization : 'Bearer '+response.data.access}}
axios.get(
newUrl,
config,
).then(response => {

    localStorage.setItem('user_id',response.data.user_info.id)
    localStorage.setItem('username',response.data.user_info.username)
    localStorage.setItem('email',response.data.user_info.email)
    localStorage.setItem('profile_slug',response.data.user_info.profile_slug)
    localStorage.setItem('profile_image',response.data.user_info.profile_image)
    this.props.login()
    this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/')



});
} ).catch(error =>{this.setState({error:true}) });

}

}
render(){
  let form =[]
  for (let field in this.state.form){
    form.push({type:this.state.form[field].type,inputConfig:this.state.form[field].inputConfig,props:this.state.form[field].props})
  }
return(
<Motion
defaultStyle={{ y: -300, opacity: 0 }}
style={{
  y: spring(10),
  opacity: spring(1)
}}
>
{ style => (
<div
style={{
transform: `translateY(${style.y}px)`,
opacity: style.opacity
}}
>

<center><h1 class='text-warning' style={!this.props.home ? {marginTop:'150px'} :null}>Login Now !</h1></center>
<br/>
<div  class={this.props.home ? 'col-lg-12' : 'offset-3 col-lg-6'}>
{ this.state.error ?
<div class="alert alert-danger" role="alert">
<center>your email or password are not correct</center>
</div> : null }
{form.map(field=>(
<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
option={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
))}
<center><button onClick={this.valid.bind(this)} class='btn btn-warning'>login</button></center>
</div>
</div>)}
</Motion>
)
}

}
const mapDispatchToProps = (dispatch)=>{
return{
  login : () => dispatch({type:'login'}),
}
}
//export default Login
export default withRouter(connect(null,mapDispatchToProps)(Login)) ;
