import React from 'react'
import Office365Auth from './components/Office365Auth'
import { connect } from 'react-redux'
import './App.css'

const App = props => {
  return (
    <div className="container is-fluid">
      <Office365Auth />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ユニークID: state.ユニークID,
    表示名: state.表示名,
  }
}

export default connect(
  mapStateToProps
)(App)
