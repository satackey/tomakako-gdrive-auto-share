import { Office365認証_表示 } from "../actionTypes"
import { 認証する_待機, 認証する_成功, 認証する_失敗 } from '../actionTypes'

const initalState = {
  office365表示: '初期読み込み中',
  office365のメール: '',
  認証処理中か: false,
  認証失敗のメッセージ: '',
}

export default (state = initalState, action) => {
  switch (action.type) {
    case Office365認証_表示: {
      return Object.assign({}, state, {
        office365表示: '認証要求',
        office365のメール: '',
        認証処理中か: false,
        認証失敗のメッセージ: '',
      })
    }

    case 認証する_待機: {
      console.log(認証する_待機)
      return Object.assign({}, state, {
        office365表示: 'リダイレクト中',
        office365のメール: '',
        認証失敗のメッセージ: '',
      })
    }

    case 認証する_成功: {
      return Object.assign({}, state, {
        office365表示: '完了',
        office365のメール: action.office365のメール,
        認証失敗のメッセージ: '',
      })
    }

    case 認証する_失敗: {
      return Object.assign({}, state, {
        office365表示: '失敗',
        office365のメール: '',
        認証失敗のメッセージ: action.認証失敗のメッセージ
      })
    }

    default: {
      return state
    }
  }
}
