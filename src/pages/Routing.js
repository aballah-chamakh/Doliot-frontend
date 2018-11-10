import React from 'react' ;
import CrudThing from '../components/CrudThing'
import Bulb from '../components/Bulb'
import Navbar from '../components/Navbar'
import AuthNavbar from '../components/AuthNavbar'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../components/Profile'
import PageNotFound from '../components/PageNotFound'
import Doc from '../components/Doc'
import DocList from '../components/DocList'
import Home from '../components/Home'
import AccountSettings from '../components/AccountSettings'
import ResetPassword from '../components/ResetPassword'
import {connect} from 'react-redux'
import { Route,withRouter,Switch } from 'react-router-dom';


class Routing extends React.Component {
  render(){
    return(
      <div style={{minHeight:'100%'}}>
      { localStorage.getItem('token') || this.props.authenticated ?
       <AuthNavbar/>
      :  <Navbar />}
      <div class='container' >
      <div  >
      <Switch>
      <Route path='/' exact component={Home} />
      <Route path="/doc's" component={DocList} />
      <Route path="/doc/:slug/" component={Doc} />
      <Route path='/bulb/:id' component={Bulb} />
      <Route path='/profile/:slug/' exact component={Profile} />
      <Route path='/profile/:slug/reset' component={AccountSettings} />
      <Route  component={PageNotFound} />
      </Switch>
      </div>
      </div>
  </div>
    )
  }
}
// backgroundColor:'grey'
const mapStateToProps = (state)=>{
  return {
    authenticated  : state.authenticated,
  }
}
export default withRouter(connect(mapStateToProps)(Routing))
