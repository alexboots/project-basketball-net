import { SET_SELECTED_LOCATION } from '../_constants/actions'

export const setLocation = (parkInfo) => {
  return { 
    type: SET_SELECTED_LOCATION, 
    parkInfo 
  }
}