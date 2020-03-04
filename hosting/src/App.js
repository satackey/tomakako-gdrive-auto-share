import React from 'react'
// import AddTodo from "./components/AddTodo"
// import TodoList from "./components/TodoList"
// import VisibilityFilters from "./components/VisibilityFilters"

import UserInfo from './components/UserInfo'
import Auth from './components/Auth'
// import { firebaseApp } from '../firebase'
// import firebase from 'firebase'
import { connect } from 'react-redux'
import './App.css'

const App = props => {
  return (
    <div>
      { props.uid ? <UserInfo /> : <Auth /> }
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state.auth.uid)
  return {
    uid: state.auth.uid,
    displayName: state.auth.displayName,
  }
}

export default connect(
  mapStateToProps
)(App)
