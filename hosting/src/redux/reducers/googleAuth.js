import { Google連携_表示, Google連携_待機, Google連携_成功, Google連携_失敗 } from '../actionTypes'

const initalState = {
  表示: '初期読み込み中',
  メール: '',
  認証失敗のメッセージ: '',
}

export default (state = initalState, action) => {
  switch (action.type) {
    case Google連携_表示: {
      return Object.assign({}, state, {
        表示: '認証要求',
        メール: '',
        認証失敗のメッセージ: '',
      })
    }

    case Google連携_待機: {
      console.log(Google連携_待機)
      return Object.assign({}, state, {
        表示: 'リダイレクト中',
        メール: '',
        認証失敗のメッセージ: '',
      })
    }

    case Google連携_成功: {
      return Object.assign({}, state, {
        表示: '完了',
        メール: action.メール,
        認証失敗のメッセージ: '',
      })
    }

    case Google連携_失敗: {
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
