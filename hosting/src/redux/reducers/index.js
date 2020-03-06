import { combineReducers } from "redux"
// import visibilityFilter from "./visibilityFilter"
// import todos from "./todos"
import office365Auth from './office365Auth'
import googleAuth from './googleAuth'

export default combineReducers({ office365Auth, googleAuth })
