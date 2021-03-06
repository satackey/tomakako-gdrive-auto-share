import { Office365認証_表示, Office365認証_待機, Office365認証_成功, Office365認証_失敗 } from '../actionTypes'

const initalState = {
  表示: '初期読み込み中',
  メール: '',
  認証失敗のメッセージ: '',
}

export default (state = initalState, action) => {
  switch (action.type) {
    case Office365認証_表示: {
      return Object.assign({}, state, {
        表示: '認証要求',
        メール: '',
        認証失敗のメッセージ: '',
      })
    }

    case Office365認証_待機: {
      return Object.assign({}, state, {
        表示: 'リダイレクト中',
        メール: '',
        認証失敗のメッセージ: '',
      })
    }

    case Office365認証_成功: {
      return Object.assign({}, state, {
        表示: '完了',
        メール: action.メール,
        認証失敗のメッセージ: '',
      })
    }

    case Office365認証_失敗: {
      return Object.assign({}, state, {
        表示: '失敗',
        メール: '',
        認証失敗のメッセージ: action.認証失敗のメッセージ
      })
    }

    default: {
      return state
    }
  }
}
