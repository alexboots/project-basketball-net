import React, { Component } from 'react'
import axios from 'axios'

import TheMap from './TheMap'
import './MapContainer.less'

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

  render() {
    const mapHeightWidth = { 
      width: '100%', 
      height: '600px' 
    }

    return (
      <div style={ mapHeightWidth }>
        <TheMap />
      </div>
    )
  }
}

export default MapContainer
