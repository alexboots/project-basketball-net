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
      height: '1000px',
      // Todo: issue : markers on the top half of the map are not clickable ?? 
      // its probably because i'm not displaying markers how the component wants me to
      // try adding markers as children and use components power
      // for not hackily hide the top half of the map :P, find proper solution when more time is available
      marginTop: '-500px'
    }

    const hackyFix = {
      height: '500px',
      overflow: 'hidden'
    }

    return (
      <div style={ hackyFix }>
        <div style={ mapHeightWidth }>
          <SelectParkMap 
            handleSetPark={ this.handleSetPark }
          />
        </div>
      </div>
    )
  }
}

export default MapContainer
