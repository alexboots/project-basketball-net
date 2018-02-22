import React, { Component } from 'react'
import './App.less'

import MapContainer from './Map/MapContainer'

class App extends Component {
  render() {  
    return (
      <div className="hello" style={{width: '100%', height: '400px'}}>
        <MapContainer />
      </div>
    )
  }
}

export default App