import { LOGGED_IN, LOGGED_OUT } from '../actionTypes'

const initialState = {
  uid: null,
  displayName: null,
  email: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN: {
      return Object.assign({}, state, {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
      })
    }

    case LOGGED_OUT: {
      return Object.assign({}, state, {
        uid: null,
        displayName: null,
        email: null,
      })
    }

    default: {
      return false
    }
  }
}
