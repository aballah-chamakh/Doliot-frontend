const initialState = {
  authenticated : false
}

const Reducer = (state=initialState,action)=>{
  let newState = Object.assign({},state) ;
  switch (action.type) {
    case 'login':
      state.authenticated = true
      return newState ;
      break;
    case 'logout':
      state.authenticated = true
      localStorage.clear()
      return newState ;
      break;
    default:
    return newState ;
  }
}

export default Reducer
