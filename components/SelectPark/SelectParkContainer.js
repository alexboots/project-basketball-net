import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setLocation } from '../../_actions'

import SelectParkMap from './SelectParkMap'
import './SelectParkContainer.less'

class MapContainer extends Component {
  handleSetLocation = (location, formattedAddress) => {

    const formattedInfo = {
      location: { 
        lat: location.lat(),
        lng: location.lng()
      },
      formattedAddress
    }

    this.props.setLocation(formattedInfo)
  }

  render() {
    const mapHeightWidth = { 
      width: '100%',
      height: '600px',
    }

    return (
      <div style={ mapHeightWidth }>
        <SelectParkMap 
          handleSetLocation={ this.handleSetLocation }
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLocation: (info) => {
    dispatch(setLocation(info))
  }
})

export default connect(null, mapDispatchToProps)(MapContainer)