import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setLocation, fetchUnfulfilledLocations } from '../../_actions'

import SelectParkMap from './SelectParkMap'
import './SelectParkContainer.less'

class MapContainer extends Component {
  componentDidMount() {
    this.props.fetchLocations()
  }

  handleNetRequest = (location, formattedAddress, placeId) => {
    const formattedData = {
      location: { 
        lat: location.lat(),
        lng: location.lng()
      },
      formattedAddress,
      placeId
    }

    this.props.handleSetLocation(formattedData)
  }

  render() {
    const mapHeightWidth = { 
      width: '100%',
      height: '600px',
    }

    return (
      <div style={ mapHeightWidth }>
        <SelectParkMap 
          unfulfilledLocations={ this.props.unfulfilledLocations }
          
          handleNetRequest={ this.handleNetRequest }
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    unfulfilledLocations: state.unfulfilledLocations.locations
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetLocation: (data) => {
    dispatch(setLocation(data))
  },
  fetchLocations: () => {
    dispatch(fetchUnfulfilledLocations())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
