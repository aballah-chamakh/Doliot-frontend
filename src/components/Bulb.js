import React from 'react'
import axios from 'axios'
class Bulb extends React.Component {

componentDidMount(){
  let url = localStorage.getItem('api_url')+'/thing/'+this.props.match.params.id+'/'
  axios.get(url).then(res=>{
    this.setState({bulb:res.data})
  })
}
 state = {
  bulb : {}
 }
  changeBulb = (val)=>{
    let action = '/switch_on/'
    if (!val){
      action = '/switch_off/'
    }
    if (val != this.state.bulb.state){
    let url = localStorage.getItem('api_url')+'/thing/'+this.props.match.params.id+action
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
    axios.put(url,{},config).then(res=>{
    this.setState({bulb:res.data.response})
  })}
  }

  render(){
    if(!localStorage.getItem('token')){
      this.props.history.push('/')
    }
    return(
      <div class ='row' style={{marginTop:'100px'}}>
      <div class ='col-lg-8 col-md-10 col-sm-12  offset-lg-2'>
      <center>
        <h5 class='text-secondary' style={{fontFamily:'cursive'}} >the  goal of <span class='text-warning' >Doliot</span> is to make it as fun as possible controlling your <span class='text-warning' >{this.state.bulb.name}</span> bulb</h5>
          <br/>
        <div>{ this.state.bulb.state ?
          <img src={this.state.bulb.on_image} class=''  height='200' width='200'/>
          :<img src={this.state.bulb.off_image} class='' height='200' width='200' />}</div>
          <br/><br/>
          <button class='btn btn-warning' onClick={()=>{this.changeBulb(true)}}>Light On</button>
          <br/><br/>
          <button class='btn btn-secondary' onClick={()=>{this.changeBulb(false)}}>Light Off</button>
      </center>
      </div>
      </div>
    )
  }
}

export default Bulb ;
