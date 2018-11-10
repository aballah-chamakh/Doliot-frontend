import React from 'react'


const PageNotFound = (props)=>{
  return (
    <div class='row' style={{marginTop:'100px'}}>
      <div class='col-lg-8 offset-2'>
         <center>
         <img class='img-fluid' height='400px' width='600'  src={require('../img/404-Error.png')}  />
         </center>

      </div>
    </div>
  )
}

export default PageNotFound ;
