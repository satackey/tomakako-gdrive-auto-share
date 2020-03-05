import firebase from 'firebase/app'
import 'firebase/auth'

import { Office365認証_表示 } from "./actionTypes"
import { 認証する_待機, 認証する_成功, 認証する_失敗 } from './actionTypes'

export const Office365認証を表示する = () => ((dispatch, getState) => {
  const state = getState()
  if (state.office365Auth.office365表示 === 'リダイレクト中' || state.office365Auth.office365表示 === '失敗') {
    return
  }

  dispatch({
    type: Office365認証_表示
  })
})

export const Office365認証する = () => (dispatch => {
  dispatch(認証待機する())
  const provider = new firebase.auth.OAuthProvider('microsoft.com')
  console.log(firebase.auth().signInWithRedirect(provider))
  // Todo: 時間がたったら戻す
})

export const 認証待機する = () => {
  return {
    type: 認証する_待機,
  }
}

export const 認証成功した = user => {
  return {
    type: 認証する_成功,
    ユニークID: user.uid,
    office365のメール: user.email,
  }
}

export const 認証失敗した = message => {
  return {
    type: 認証する_失敗,
    認証失敗のメッセージ: message
  }
}

// export const Office365認証画面を変更 = 表示 => ({
//   type: 認証画面変更_Office365,
//   表示
// })
