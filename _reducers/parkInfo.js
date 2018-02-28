import { SET_SELECTED_LOCATION } from '../_constants/actions'

const defaultState = {
  location: { 
    lat: null,
    lng: null
  },
  formattedAddress: null
}

const setPark = (state = defaultState, action) => {
  switch (action.type) {

    case SET_SELECTED_LOCATION:
      return {
        ...state,
        ...action.parkInfo
      }
    default:
      return state
  }
}

export default setPark