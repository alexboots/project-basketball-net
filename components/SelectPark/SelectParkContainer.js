import React, { Component } from 'react'
import axios from 'axios'

import SelectParkMap from './SelectParkMap'
import './SelectParkContainer.less'

class MapContainer extends Component {
  constructor(props) {
    super(props)
    // axios.get('http://localhost:3000/api/request/12345')
    // .then(function (res) {
    //   console.log('hi', res.data)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
  }
  
  handleSetPark = (parkInfo) => {
    console.log('parkInfo', parkInfo);
  }

  render() {
    const mapHeightWidth = { 
      width: '100%', 
      height: '600px' 
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

export default MapContainer
