import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

import './App.less'

import About from './AboutUs/About'
import SelectParkContainer from './SelectPark/SelectParkContainer'
import InputCourtInfo from './InputCourtInfo/InputCourtInfo'

class App extends Component {
  constructor() {
    super()
    this.state = {
      showRequestMap: true // shows request || requested maps
    }
  }

  toggleMap = () => {
    this.setState({
      showRequestMap: !this.state.showRequestMap
    })
  }

  render() {  
    return (
      <div>
        <About />

        <Menu pointing secondary>
          <Menu.Item 
            active={ this.state.showRequestMap } 
            name='Request Nets'
            onClick={ this.toggleMap } 
          />
          <Menu.Item 
            active={ !this.state.showRequestMap } 
            name='Needs Nets' 
            onClick={ this.toggleMap }
          />
        </Menu>
        { this.state.showRequestMap ?
            (
              <div>
                <InputCourtInfo />
                <SelectParkContainer />
              </div>
            ) : (
              'We will add this shortly!'
        ) }
      </div>
    )
  }
}

export default App