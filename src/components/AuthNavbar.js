import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

class AuthNavbar extends React.Component {

  render(){
    return(
      <nav class="navbar navbar-expand-lg navbar-light  bg-light fixed-top">
       <div class="container">
         <Link class="navbar-brand" to={'/profile/'+localStorage.getItem('profile_slug')+'/'}>Doliot</Link>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarResponsive">
         <ul class="navbar-nav mr-auto">
         <li class="nav-item">
           <Link class="nav-link" to="/doc's">doc's</Link>
         </li>
         </ul>
           <ul class="navbar-nav ml-auto">
             <li class="nav-item active">
             <Link class="nav-link" to={'/profile/'+localStorage.getItem('profile_slug')+'/'}>
             {localStorage.getItem('username')}
                 <span class="sr-only">(current)</span>
               </Link>
             </li>
     <li class="nav-item">
      <div class="dropdown">
       <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Settings
       </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
      <button onClick={()=>{this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/reset/username')}} class="dropdown-item" type="button" >change name</button>
      <button onClick={()=>{this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/reset/image')}} class="dropdown-item" type="button" >change profile image</button>
        <button onClick={()=>{this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/reset/password')}} class="dropdown-item" type="button" >change password</button>
         <div class="dropdown-divider"></div>
         <button class="dropdown-item" type="button" onClick={()=>{this.props.logout();this.props.history.push('/');}}>logout</button>
      </div>
    </div>
  </li>

           </ul>
         </div>
       </div>
     </nav>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    logout : ()=>dispatch({type:'logout'}),
  }
}

export default withRouter(connect(null,mapDispatchToProps)(AuthNavbar))
