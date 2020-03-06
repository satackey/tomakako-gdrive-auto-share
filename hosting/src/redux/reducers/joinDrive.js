import { Drive共有_表示, Drive共有_待機, Drive共有_成功, Drive共有_失敗 } from '../actionTypes'

const initalState = {
  表示: '初期読み込み中',
  送信されたメール: '',
  招待された日時: '',
  認証失敗のメッセージ: '',
  ドライブID: '',
}

export default (state = initalState, action) => {
  switch (action.type) {
    case Drive共有_表示: {
      return Object.assign({}, state, {
        表示: '参加要求',
        送信されたメール: '',
        招待された日時: '',
        認証失敗のメッセージ: '',
        ドライブID: '',
      })
    }

    case Drive共有_待機: {
      return Object.assign({}, state, {
        表示: '参加処理中',
        送信されたメール: '',
        招待された日時: '',
        認証失敗のメッセージ: '',
        ドライブID: '',
      })
    }

    case Drive共有_成功: {
      return Object.assign({}, state, {
        表示: '完了',
        送信されたメール: action.sentTo,
        招待された日時: action.invitedAt,
        認証失敗のメッセージ: '',
        ドライブID: action.invitedTo,
      })
    }

    case Drive共有_失敗: {
      return Object.assign({}, state, {
        表示: '失敗',
        送信されたメール: '',
        招待された日時: '',
        認証失敗のメッセージ: action.message,
        ドライブID: '',
      })
    }

    default: {
      return state
    }
  }
}
