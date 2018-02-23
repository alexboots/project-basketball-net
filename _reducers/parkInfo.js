import { SET_PARK_NAME, SET_NETS_NEEDED, SET_HOOPS_COUNT } from '../_constants/actions'

const defaultState = {
  name: ''
  howManyNetsNeeded: 0,
  howManyBasketballHoops: 0
}

const setPark = (state = defaultState, action) => {
  switch (action.type) {
    
    case SET_PARK_NAME:
      action.name 
      return {
        ...state
      }
    default:
      return state
  }
}

export default setPark