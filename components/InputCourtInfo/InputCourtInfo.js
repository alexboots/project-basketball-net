import React, { Component } from 'react'
import { Grid, Input, Button, Icon, Header } from 'semantic-ui-react'
import './InputCourtInfo.less'

class InputCourtInfo extends Component {
  constructor() {
    super()
    this.state = { 
      netsRequested: '',
      hoopsCount: '',
      notes: ''
    }
  }

  handleRequest = (e) => {
    e.preventDefault()
    this.props.handleRequest({ 
      netsRequested: this.state.netsRequested,
      hoopsCount: this.state.hoopsCount,
      notes: this.state.notes
    })
  }

  render() {
    const disabled = !(this.props.parkInfo !== null && this.state.netsRequested.length !== 0 && this.state.hoopsCount.length !== 0)

    return (
      <div className="net-info-inputs">
        <Grid columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <h4>Court Location</h4>
              <h5>{ this.props.parkInfo ? this.props.parkInfo.formattedAddress : '(Tap place below to set location)' }</h5>
            </Grid.Column>
            <Grid.Column>
              <h4>Number of Nets needed </h4>
              <Input 
                type="number" 
                placeholder="#" 
                value={ this.state.netsRequested } 
                onChange={ (e) => this.setState({ nets: e.target.value }) }
              />
            </Grid.Column>
            <Grid.Column>
              <h4>Number of Hoops at court</h4>
              <Input 
                type="number" 
                placeholder="#" 
                value={ this.state.hoopsCount } 
                onChange={ (e) => this.setState({ hoops: e.target.value }) }
              />
            </Grid.Column>
            <Grid.Column>
              <h4>Any notes</h4>
              <Input 
                type="text" 
                placeholder="(optional)" 
                onChange={ (e) => this.setState({ notes: e.target.value }) }
              />
            </Grid.Column>
            <Grid.Column>
              <h4>&nbsp;</h4>
              <Button 
                disabled={ disabled }
                type="submit" onClick={ this.handleRequest }
              >
                Request
              </Button>
            </Grid.Column>
          </Grid.Row>
          { /* todo: is this + adding pin on map good enough? consider UX */ }
          { this.props.parkInfo && 
            <Grid.Row>
              <Grid.Column>
                <Header as='h4'>
                  <Icon disabled name='checkmark' color='green' />
                  Address Selected
               </Header>
              </Grid.Column>
            </Grid.Row>
          }
        </Grid>
      </div>
    )
  }
}

export default InputCourtInfo

