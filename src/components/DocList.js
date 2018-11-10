import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class DocList extends React.Component {
  state = {
    documentations : []
  }
componentDidMount(){
  let url = localStorage.getItem('api_url')+'/documentation/'
  axios.get(url).then(res=>{
    this.setState({documentations:res.data})
  })
}
  render(){
    return(
      <div style={{marginTop:'100px'}}>
      <h4 style={{color:'orange'}}>Doliot doc's</h4>
      <hr/>
      <div class='row' >
      <br/><br/>
{this.state.documentations.map(doc=>{
  return(
  <div class='col-lg-6 col-md-12 col-sm-12'>
<div class="card ">
<img class="card-img-top" src={doc.image} alt="Card image cap" />
<div class="card-body">
<Link to={'/doc/'+doc.slug+'/'}><h5 class="card-title" >{doc.title}</h5></Link>
<p class="card-text">{doc.breif}</p>
</div>
</div>
<br/>
      </div>)})}
      </div>  </div>
    )
  }
}
export default DocList
