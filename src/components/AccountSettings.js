import React from 'react' ;
import {Route} from 'react-router-dom' ;
import ResetImage from './ResetImage' ;
import ResetName from './ResetName' ;
import ResetPassword from './ResetPassword' ;
import {Link} from 'react-router-dom' ;

import axios from 'axios' ;

class AccountSettings extends React.Component {
  state ={
      profile : null ,

  }
  componentDidMount(){
    let url = localStorage.getItem('api_url')+'/simple-profile/'+localStorage.getItem('profile_slug')+'/'
    axios.get(url,).then(res=>this.setState({profile:res.data}))
  }
  reloadProfile =()=>{
    let url = localStorage.getItem('api_url')+'/simple-profile/'+localStorage.getItem('profile_slug')+'/'
    axios.get(url,).then(res=>this.setState({profile:res.data}))
  }
  render(){
    if(!localStorage.getItem('token')){
      this.props.history.push('/')
    }
    return(
      <div class='container'>
      <br/><br/><br/><br/>
      <div class='row'>
      <title>Account Settings</title>
         <div class="col-lg-4 offset-lg-4  col-sm-12" >
           <center>
            { this.state.profile ?
              <span>
              <img  src={this.state.profile.image} class="rounded-circle" height='150' width='150'  />
             <Link to={'/profile/'+this.state.profile.slug+'/'}><h5 style={{margin:'10px'}} >{this.state.profile.username}</h5></Link>
             <br/>
             <hr/>
             <br/>
             </span>
             : null}
            </center>
          </div></div>
      <div>
      <Route path='/profile/:id/reset/username' render={()=>(<ResetName  reloadProfile={this.reloadProfile} />)} />
      <Route path='/profile/:id/reset/image' render={()=>(<ResetImage  reloadProfile={this.reloadProfile} />)} />
      <Route path='/profile/:id/reset/password' component={ResetPassword} />
      </div>
      </div>

    )
  }
}
export default AccountSettings
