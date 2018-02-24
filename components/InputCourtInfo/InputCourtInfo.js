import React, { Component } from 'react'
import { Grid, Input, Button, Icon, Header } from 'semantic-ui-react'
import './InputCourtInfo.less'

class InputCourtInfo extends Component {
  constructor() {
    super()
    this.state = { 
      nets: '',
      hoops: '',
      notes: ''
    }
  }

  handleRequest = (e) => {
    e.preventDefault()
    this.props.handleRequest({ 
      nets: this.state.nets,
      hoops: this.state.hoops,
      notes: this.state.notes
    })
  }

  render() {
    const disabled = !(this.props.parkInfo !== null && this.state.nets.length !== 0 && this.state.hoops.length !== 0)

    return (
      <div className="net-info-inputs">
        <Grid columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <h4>Court Location</h4>
              <h5>{ this.props.parkInfo ? this.props.parkInfo.fullAddress : '(Tap place below to set location)' }</h5>
            </Grid.Column>
            <Grid.Column>
              <h4>Number of Nets needed </h4>
              <Input 
                type="number" 
                placeholder="#" 
                value={ this.state.nets } 
                onChange={ (e) => this.setState({ nets: e.target.value }) }
              />
            </Grid.Column>
            <Grid.Column>
              <h4>Number of Hoops at court</h4>
              <Input 
                type="number" 
                placeholder="#" 
                value={ this.state.hoops } 
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
          { /* todo: add something to the map itself to say 'location selected', this is crap UX */ }
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

