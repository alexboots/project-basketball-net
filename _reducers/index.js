import { combineReducers } from 'redux'

import selectLocation from './selectLocation'
import netRequest from './netRequest'
import unfulfilledLocations from './unfulfilledLocations'

const reducers = combineReducers({
  selectLocation,
  netRequest,
  unfulfilledLocations
})

export default reducers