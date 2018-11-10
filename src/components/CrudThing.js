import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class CrudThing extends React.Component {
  state = {

      name : {val:'',msg:''},

  }

changeHandler = (e,field)=>{

  this.setState({name:{val:e.target.value,msg:''}})


}

newThing = ()=>{
  if(this.state.name.val !=''){
   let url = localStorage.getItem('api_url')+'/thing/'
   let data ={'name':this.state.name.val}
   let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
   axios.post(url,data,config).then(res=>{
   this.props.history.push('/bulb/'+res.data.id)
  })}
}

render(){
  return(
    <div class='row'  style={{marginTop:'25px'}}>
    <div class='col-lg-6 col-sm-12 offset-lg-3'>
       <div class='form-group '>
       <input placeholder='bub name ...' class='form-control' value={this.state.name.val} onChange={this.changeHandler} />
       </div>
  <center>  <button class='btn btn-warning' onClick={this.newThing}>create bulb</button></center>

    </div>
    </div>
  )
}


}

export default withRouter(CrudThing)
