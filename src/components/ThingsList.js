import React from 'react'
import { withRouter } from 'react-router-dom';
class ThingsList extends React.Component {
  render(){
    return(
      <div class='row'>
      {this.props.things.map((thing,idx)=>{
        return(
        <div class='col-lg-3 col-sm-12 col-md-6'>
          <div class="card" style={{marginBottom:'20px'}} >
          <div class='card-header'>
          <div>
           <button class='btn btn-warning' onClick={()=>{this.props.delete(idx)}} style={{borderRadius:'50%'}}><i class="fas fa-trash-alt"></i></button>
         </div>
          </div>
      { thing.state ?
        <img   class="card-img-top" src={thing.on_image}  height='300' width='300'/>
        :<img   class="card-img-top" src={thing.off_image} height='300' width='300' />}
      <div class="card-footer">
        <center><h5 class="card-title">{thing.name}</h5>
        <button onClick={()=>{this.props.history.push('/bulb/'+thing.id)}} class="btn btn-primary">Control</button></center>
      </div>
    </div>
      </div>


        )
      })}
    </div>
    )
  }
}
export default withRouter(ThingsList) ;
