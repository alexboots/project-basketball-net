import axios from 'axios'


// Set location when user clicks map
//***********************************************
export const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION'
export const setLocation = (locationInfo) => {
  return { 
    type: SET_SELECTED_LOCATION, 
    locationInfo 
  }
}

//**********************
//**********************
// API actions below   *
//**********************
//**********************

// get current requests
//***********************************************
export const UNFULFILLED_LOCATIONS_REQUEST = 'UNFULFILLED_LOCATIONS_REQUEST'
function unfulfilledLocations() {
  return {
    type: UNFULFILLED_LOCATIONS_REQUEST
  }
}
 
export const UNFULFILLED_LOCATIONS_RECEIVED = 'UNFULFILLED_LOCATIONS_RECEIVED'
function unfulfilledLocationsReceived(locations) {
  return {
    type: UNFULFILLED_LOCATIONS_RECEIVED,
    locations
    // posts: json.data.children.map(child => child.data)
  }
}
 
export const UNFULFILLED_LOCATIONS_ERROR = 'UNFULFILLED_LOCATIONS_ERROR'
export function unfulfilledLocationsError(error) {
  return {
    type: UNFULFILLED_LOCATIONS_ERROR,
    error
  }
}

export function fetchUnfulfilledLocations() {
  return function (dispatch) {
    dispatch(unfulfilledLocations())

    return axios.get('http://localhost:3000/requests/')
      .then((response) => {
        const locations = response.data
        dispatch(unfulfilledLocationsReceived(locations))
      })
      .catch((error) => {
        console.error('Error fetching unfulfilled locations:: ', error)
        dispatch(unfulfilledLocationsError(error))
      }) 
  }
}

// post nets request
//***********************************************
export const POST_NET_REQUEST = 'POST_NET_REQUEST' 
export const netRequest = (data) => {
  return {
    type: POST_NET_REQUEST
  }
}

export const POST_NET_REQUEST_SUCCESS = 'POST_NET_REQUEST_SUCCESS' 
export const netRequestSuccess = (formattedAddress) => {
  return {
    type: POST_NET_REQUEST_SUCCESS,
    formattedAddress
  }
}

export const POST_NET_REQUEST_ERROR = 'POST_NET_REQUEST_FAILURE' 
export const netRequestError = () => {
  return {
    type: POST_NET_REQUEST_ERROR
  }
}

export const postNetRequest = (data) => {
  return function (dispatch) {
    dispatch(netRequest())
    return axios.post('http://localhost:3000/request/', data)
      .then(function (response) {
        const formattedAddress = response.data.formattedAddress
        dispatch(netRequestSuccess(formattedAddress))
      })
      .catch(function (error) {
        console.error('postNetRequest :: ', error);
        dispatch(netRequestError)
      })
  }
}
