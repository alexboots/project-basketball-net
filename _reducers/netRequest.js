import { 
  POST_NET_REQUEST,
  POST_NET_REQUEST_SUCCESS,
  POST_NET_REQUEST_ERROR
} from '../_actions'

const defaultState = {
  posting: false
}

const netRequest = (state = defaultState, action) => {
  switch (action.type) {
    case POST_NET_REQUEST:
      return {
        ...state,
        posting: true
      }
    case POST_NET_REQUEST_SUCCESS:
      return {
        ...state,
        posting: false
      }
    case POST_NET_REQUEST_ERROR:
      return {
        ...state,
        ...action.error,
        posting: false
      }
    default:
      return state
  }
}

export default netRequest