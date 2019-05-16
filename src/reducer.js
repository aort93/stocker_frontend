const defaultState = {
  homeArticles: [],
  page: 'home',
  currentUser: null
}


function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_HOME_ARTICLES":
      return {...state, homeArticles: action.payload}
    default:
    return state
  }
}

export default reducer
