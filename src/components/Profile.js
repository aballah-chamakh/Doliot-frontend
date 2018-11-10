import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ThingsList from './ThingsList'
import CrudThing from './CrudThing'
class Profile extends React.Component {

state = {
  profile : null,
  showed : 'thingsList',
  search : '',
}

componentDidMount(){
  let url = localStorage.getItem('api_url')+'/profile/'+this.props.match.params.slug+'/'
  axios.get(url).then(res=>{
    this.setState({profile:res.data})
  })
}
toogleShowed = (showed)=>{
  this.setState({showed:showed})
}

delete = (idx)=>{
  let profile = this.state.profile
  let thing_id = profile.things[idx].id
  profile.things.splice(idx,1)
  let url = localStorage.getItem('api_url')+'/thing/'+thing_id+'/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
  axios.delete(url,config).then(res=>{
    this.setState({profile:profile})
  })

}

render(){
  if(!localStorage.getItem('token')){
    this.props.history.push('/')
  }
  return(
    <div>
    { this.state.profile ?
      <div style={{marginTop:'100px'}}>
      <div class='row'>
      <div class='col-lg-4 col-sm-12 offset-lg-4' >
        <center>
        <img class='rounded-circle' src={this.state.profile.image} height='150px' width='150px'/>
        <Link   to={'/profile/'+this.state.profile.slug}><h5 style={{margin:'10px'}}>{this.state.profile.username}</h5></Link>
        <div>
        { this.state.showed == 'thingsList' ?
          <button class='btn btn-warning' onClick={()=>{this.toogleShowed('newThing')}}>new bulb</button>
          : <button class='btn btn-warning' onClick={()=>{this.toogleShowed('thingsList')}}>forget</button>
        }</div>
         </center>
         <hr/>
      </div>
      </div>
    <div>
       { this.state.showed == 'thingsList' ?
         <ThingsList things={this.state.profile.things} delete={this.delete} /> : <CrudThing/> }
    </div>
    </div> : null }
    </div>
  )
}

}
export default Profile ;
