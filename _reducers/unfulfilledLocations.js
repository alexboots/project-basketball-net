import { 
  UNFULFILLED_LOCATIONS_REQUEST,
  UNFULFILLED_LOCATIONS_RECEIVED,
  UNFULFILLED_LOCATIONS_ERROR
} from '../_actions'

const defaultState = {
  loadingUnfulfilledLocations: false,
  locations: [],
  unfulfilledError: null
}

const unfulfilledLocations = (state = defaultState, action) => {
  switch (action.type) {
    case UNFULFILLED_LOCATIONS_REQUEST:
      return {
        ...state,
        loadingUnfulfilledLocations: true
      }
    case UNFULFILLED_LOCATIONS_RECEIVED:
      return {
        ...state,
        loadingUnfulfilledLocations: false,
        locations: action.locations
      }
    case UNFULFILLED_LOCATIONS_ERROR:
      return {
        ...state,
        loadingUnfulfilledLocations: false,
        unfulfilledError: action.error
      }
    default:
      return state
  }
}

export default unfulfilledLocations