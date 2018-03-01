import { 
  POST_NET_REQUEST,
  POST_NET_REQUEST_SUCCESS,
  POST_NET_REQUEST_ERROR
} from '../_actions'

const defaultState = {
  posting: false,
  formattedAddress: null
}

const netRequest = (state = defaultState, action) => {
  switch (action.type) {
    case POST_NET_REQUEST:
      return {
        ...state,
        posting: true,
        formattedAddress: null
      }
    case POST_NET_REQUEST_SUCCESS:
      return {
        ...state,
        posting: false,
        formattedAddress: action.formattedAddress
      }
    case POST_NET_REQUEST_ERROR:
      return {
        ...state,
        ...action.error,
        posting: false,
        formattedAddress: null
      }
    default:
      return state
  }
}

export default netRequest