import React, { Component } from 'react'
import axios from 'axios'

import Map from './Map'

class MapContainer extends Component {
  constructor(props) {
    super(props)
    axios.get('http://localhost:3000/api/request/12345')
    .then(function (res) {
      console.log('hi', res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
       <Map />
    )
  }
}

export default MapContainer
