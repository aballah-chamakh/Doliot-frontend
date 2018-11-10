import React from 'react'
import Login from './Login'
import Register from './Register'
import {Link} from 'react-router-dom'

class Home extends React.Component {

state = {
  loginRegister : true ,
}
toogle = ()=>{
  let loginRegister =  !this.state.loginRegister
  this.setState({loginRegister:loginRegister})
}
render(){
  if(localStorage.getItem('profile_slug')){
    this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/')
  }
  return(
    <div class='row' style={{marginTop:'100px'}} >
    <div class='col-lg-6'>
    <center>
    <h3 class='text-secondary' style={{fontFamily:'cursive'}} >Doliot</h3>
    <img src={require('../img/home_iot2.png')}  class='img-fluid' height='600' width='600' />
    </center>
      </div>
    <div class='col-lg-6' style={{marginTop:'50px'}}>
  { this.state.loginRegister ? <Login home={true} /> : <Register home={true} toogle={this.toogle}/>}
    <br/>
    <center><button onClick={this.toogle}  class='btn btn-link'>{this.state.loginRegister ? "You don't have an account ? register now !" : "Already you have an account ? register now !" }</button></center>
      </div>
    </div>
  )
}


}
export default Home
