import React, { Component } from 'react'
import { Container, Header, Menu, Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './semantic-ui-overrides.less'
import './App.less'

import About from './AboutUs/About'
import SelectParkContainer from './SelectPark/SelectParkContainer'
import InputCourtInfoContainer from './InputCourtInfo/InputCourtInfoContainer'

import {  
  TAB_REQUEST_MAP,
  TAB_ADDED_NETS_MAP,
  TAB_ABOUT_US
} from '../_constants/tabs'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tab: TAB_REQUEST_MAP
    }
  }

  renderTab = (tab) => {
    if(tab === TAB_REQUEST_MAP) {
      return(
        <div>
          <InputCourtInfoContainer />
          <SelectParkContainer />
        </div>
      )
    } else if(tab === TAB_ADDED_NETS_MAP) {
      return ('We will add this shortly!')
    } else if(tab === TAB_ABOUT_US) {
      return (<About />)
    }
  }

  render() {  
    return (
      <Container className="app-wrapper">
        <div className="app-header">
          <Header as='h2'> Project Basketball Net 
            <Header.Subheader>
              We put nets on basketball rims<br/>
              <a href="https://instagram.com/projectbasketballnet" target="_blank">instagram.com/projectbasketballnet</a>
            </Header.Subheader>
          </Header>
        </div>
        <Menu pointing secondary>
          <Menu.Item 
            active={ this.state.tab === TAB_REQUEST_MAP } 
            name='Request Nets'
            onClick={ () => this.setState({ tab: TAB_REQUEST_MAP }) } 
          />
          <Menu.Item 
            active={ this.state.tab === TAB_ADDED_NETS_MAP  } 
            name='Put up nets'
            onClick={ () => this.setState({ tab: TAB_ADDED_NETS_MAP }) } 
          />
          <Menu.Item 
            active={ this.state.tab === TAB_ABOUT_US } 
            name='About' 
            onClick={ () => this.setState({ tab: TAB_ABOUT_US }) }
          />
        </Menu>
        { 
          this.renderTab(this.state.tab)
        }
      </Container>
    )
  }
}

export default App