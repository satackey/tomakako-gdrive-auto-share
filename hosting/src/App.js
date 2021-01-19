import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase/app'

import './App.css'

import Office365Auth from './components/Office365Auth'
import GoogleAuth from './components/GoogleAuth'
import JoinDrive from './components/JoinDrive'
import { 
  Office365認証失敗した, ユーザ情報を更新する,
} from './redux/actions'

const App = props => {
  useEffect(() => {
    props.ログインをチェックする()
  })

  return (
    <div className="container is-fluid">
      <Office365Auth />
      <GoogleAuth />
      <JoinDrive />
    </div>
  )
}

const mapStateToProps = state => ({
  // ユニークID: state.ユニークID,
  // 表示名: state.表示名,
})

const mapDispatchToProps = dispatch => ({
  ログインをチェックする() {
    firebase.auth().getRedirectResult().catch(e => {
      console.error('getRedirectResult', e)
      dispatch(Office365認証失敗した(e.message))
    })

    firebase.auth().onAuthStateChanged(async userState => {
      dispatch(ユーザ情報を更新する(userState))
    }, e => {
      console.error('onAuthStateChanged', e)
      dispatch(Office365認証失敗した(e.message))
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
