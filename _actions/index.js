import { SET_SELECTED_LOCATION, SUBMIT_REQUEST } from '../_constants/actions'

export const setLocation = (parkInfo) => {
  return { 
    type: SET_SELECTED_LOCATION, 
    parkInfo 
  }
}

