const defaultState = {
  homeArticles: [],
  page: 'home',
  currentUser: null,
  currentStock: null,
  userTransaction: []
}


function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_HOME_ARTICLES":
      return {...state, homeArticles: action.payload}
    case "SELECT_STOCK":
      return {...state, currentStock: action.payload}
    case "GET_TRANSACTION":
      return {...state, userTransaction: action.payload}
    default:
    return state
  }
}

export default reducer
