import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setLocation } from '../../_actions'

import SelectParkMap from './SelectParkMap'
import './SelectParkContainer.less'

class MapContainer extends Component {
  handleSetPark = (parkInfo) => {
    console.log('parkInfo', parkInfo);
    const formattedInfo = {
      location: { 
        lat: parkInfo.location.lat(),
        lng: parkInfo.location.lng()
      },
      fullAddress: parkInfo.formatted_address
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
          handleSetPark={ this.handleSetPark }
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