import { SET_SELECTED_LOCATION } from '../_actions'

const defaultState = {
  location: { 
    lat: null,
    lng: null
  },
  formattedAddress: null
}

const selectLocation = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        ...action.locationInfo
      }
    default:
      return state
  }
}

export default selectLocation