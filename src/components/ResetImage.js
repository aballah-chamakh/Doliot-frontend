import React from 'react'
import axios from 'axios'
class ResetImage extends React.Component {
  state = {img:{imgFile:'',imgUrl:''}}
  change = (e)=>{
  let imgFile = e.target.files[0]
  if (imgFile){
  let imgUrl = URL.createObjectURL(imgFile)
  let img= {imgFile:imgFile,imgUrl:imgUrl}
  this.setState({img:img})}
  }
  submitImage = ()=>{
    let formData = new FormData()
    formData.append('image',this.state.img.imgFile)
    let url = localStorage.getItem('api_url')+'/profile/'+localStorage.getItem('profile_slug')+'/reset_image/'
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
    axios.put(url,formData,config).then(res=>{ this.props.reloadProfile(); this.setState({img:{}})})
  }
  render(){
    return(
      <div class='row'>
      <div class='col-lg-6 offset-lg-3  col-sm-12'>
      <input type='file' ref={(inpFile)=>{this.inpFile=inpFile}} id='input'  style={{display:'none'}} onChange={this.change}/>
      <center><button  class='btn btn-warning' onClick={()=>{this.inpFile.click()}}>upload</button>
      <br/><br/>
      {this.state.img.imgUrl ?
        <span>
         <img src={this.state.img.imgUrl}  height='200' width='200'/>
         <br/><br/>
         <button class='btn btn-warning' onClick={this.submitImage}>submit</button>
        </span>
         : null}
</center>
      </div>
      </div>
    )
  }
}
export default ResetImage ;
