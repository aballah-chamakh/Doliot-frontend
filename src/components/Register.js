import React from 'react' ;
import Input from '../Ui/Input' ;
import axios from 'axios' ;
import { Motion, spring } from "react-motion";
import {ChangeHandler,CheckValidity} from '../Shared/FormFunc' ;
import {withRouter} from 'react-router-dom'

class Register extends React.Component{
state = {
  error : false ,
  form:{
    email : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your email'},
      props : {
        field:'email',
        label:'Email',
        msg:'',
        value : '',
        validators :{required:true,email:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    username : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your username'},
      props : {
        field:'username',
        label:'Username',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    password : {
      type :'input',
      inputConfig:{type:'password',placeholder:'enter your password'},
      props : {
        field:'password',
        label:'Password',
        value : '',
        msg:'',
        validators :{required:true,password:true},
        isValid : false,
        classes : 'form-control',

      }
    },
    password2 : {
      type :'input',
      inputConfig:{type:'password',placeholder:'confirm password'},
      props : {
        field:'password2',
        label:'Confirm Password',
        value : '',
        msg:'',
        validators :{required:true,passwordMatch:true,password:true},
        isValid : false,
        classes : 'form-control',

      }
    },
  }
}
change(event,field){
let state = ChangeHandler(event,this.state,field)
this.setState({state:state})
}
valid =()=>{
  let fields = ['email','username','password','password2']
  let payload = null
  fields.map(field=>{
     payload = CheckValidity(this.state,field)
       if(!payload.isValid){this.setState({state:payload.state}) }
     if (field == 'email' && payload.isValid){
       let state = this.state
       let value = state.form[field].props.value
       let url = localStorage.getItem('api_url')+'/user/email_exist/'
         let data = {'email':value}
         axios.post(url,data).then((res)=>{
           if (res.data.exist){
           state.form[field].props.isValid = false ;
           state.form[field].props.msg = 'this email already exist' ;
           if(state.form[field].props.classes.indexOf('is-invalid') === -1){
           state.form[field].props.classes += ' is-invalid' ;}}
           this.setState({state:state})
     })
  }})
  if(payload.state.form.email.props.isValid && payload.state.form.username.props.isValid && payload.state.form.password.props.isValid && payload.state.form.password2.props.isValid){
    let form = { email:payload.state.form.email.props.value,
                 username:payload.state.form.username.props.value,
                 password:payload.state.form.password.props.value,
                 password2:payload.state.form.password2.props.value }
    let url = localStorage.getItem('api_url')+'/user/'
    axios.post(url,form).then(response=>{
    this.props.toogle()

    })
  //  console.log(this.state.form);
  }


}
render(){
  let form =[]
  for (let field in this.state.form){
    form.push({type:this.state.form[field].type,inputConfig:this.state.form[field].inputConfig,props:this.state.form[field].props})
  }
return(
<Motion
defaultStyle={{ y: -200, opacity: 0 }}
style={{
  y: spring(10),
  opacity: spring(1)
}}
 >
 {style => (
<div
style={{
transform: `translateY(${style.y}px)`,
opacity: style.opacity
}}
>
<center><h1 class='text-warning' style={!this.props.home ? {marginTop:'150px'} :null} >Register Now !</h1></center>
<br/>
<div class={this.props.home ? 'col-lg-12' :'offset-3 col-lg-6'}>
{form.map(field=>(
  <div>
<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
option={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
<h1>{field.value}</h1>
</div>
)
)}
<center><button onClick={this.valid.bind(this)} class='btn btn-warning'>register</button></center>
</div>
</div>)}
</Motion>
)
}

}
export default withRouter(Register) ;
