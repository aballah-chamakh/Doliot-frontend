import React, { Component } from 'react';
import Routing from './pages/Routing' ;

class App extends Component {


  render() {
    if(!localStorage.getItem('api_url')){
      if (window.location.origin == 'http://localhost:3000'){
        console.log('yeah they match');
        localStorage.setItem('api_url','http://127.0.0.1:8000/api')
      } else{
        console.log('set the origin');
        localStorage.setItem('api_url',window.location.origin+'/api')
      }
    }
    return (
      <div >
      <Routing />
      </div>
    );
  }
}

export default App;
