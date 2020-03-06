import firebase from 'firebase/app'
import 'firebase/auth'

import {
  Office365認証_表示, Office365認証_待機, Office365認証_成功, Office365認証_失敗,
  Google連携_表示, Google連携_待機, Google連携_成功, Google連携_失敗,
} from './actionTypes'


/*
 * Office365認証
 */

export const Office365認証がされていない = () => (dispatch, getState) => {
  const state = getState()
  if (state.office365Auth.office365表示 === 'リダイレクト中' || state.office365Auth.office365表示 === '失敗') {
    return
  }

  dispatch(Office365認証を表示する())
}

export const Office365認証を表示する = () => ({
  type: Office365認証_表示
})

export const Office365認証する = () => (dispatch => {
  dispatch(Office365認証待機する())

  const provider = new firebase.auth.OAuthProvider('microsoft.com')
  console.log(firebase.auth().signInWithRedirect(provider))
  // Todo: 時間がたったら戻す
})

export const Office365認証待機する = () => ({
  type: Office365認証_待機,
})

export const Office365認証成功した = メール => ({
  type: Office365認証_成功,
  メール: メール,
})

export const Office365認証失敗した = message => ({
  type: Office365認証_失敗,
  認証失敗のメッセージ: message,
})

/*
 * Google連携
 */

export const Google連携がされていない = () => (dispatch, getState) => {
  const state = getState()
  if (state.googleAuth.表示 === 'リダイレクト中' || state.googleAuth.表示 === '失敗') {
    return
  }

  dispatch(Google連携を表示する())
}

export const Google連携する = () => (dispatch => {
  dispatch(Google連携待機する())

  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().currentUser.linkWithRedirect(provider)
  // Todo: 時間がたったら戻す
})

export const Google連携を表示する = () => ({
  type: Google連携_表示,
})

export const Google連携待機する = () => ({
  type: Google連携_待機,
})

export const Google連携成功した = メール => ({
  type: Google連携_成功,
  メール,
})

export const Google連携失敗した = () => ({
  type: Google連携_失敗,
})
