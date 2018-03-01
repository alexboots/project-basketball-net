import React, { Component } from 'react'
import { Grid, Input, Button, Icon, Header, Loader } from 'semantic-ui-react'
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

  handleNetRequest = (e) => {
    e.preventDefault()
    this.props.handleNetRequest({ 
      netsRequested: this.state.netsRequested,
      hoopsCount: this.state.hoopsCount,
      notes: this.state.notes
    })
  }

  render() {
    const disabled = !(this.props.locationInfo !== null && this.state.netsRequested.length !== 0 && this.state.hoopsCount.length !== 0)

    return (
      <div className="net-info-inputs">
        { !this.props.netRequested ? 
          <Grid columns='equal' stackable>
            <Grid.Row>
              <Grid.Column>
                <h4>Nets needed </h4>
                <Input 
                  type="number" 
                  placeholder="#" 
                  value={ this.state.netsRequested } 
                  onChange={ (e) => this.setState({ netsRequested: e.target.value }) }
                />
              </Grid.Column>
              <Grid.Column>
                <h4>Hoops at court</h4>
                <Input 
                  type="number" 
                  placeholder="#" 
                  value={ this.state.hoopsCount } 
                  onChange={ (e) => this.setState({ hoopsCount: e.target.value }) }
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
                  floated='right'
                  disabled={ disabled || this.props.requestingNet }
                  type="submit" onClick={ this.handleNetRequest }
                >
                  Request
                  { this.props.requestingNet && 
                    <Loader size='mini' inline active />
                  }
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <span className="label-count-location">
                  Location:  
                  { this.props.locationInfo ? (
                    <span className="underlined">
                      { ` ${this.props.locationInfo.formattedAddress} ` }
                      <Icon disabled name='checkmark' color='green' />
                    </span>) 
                    :  (' (Tap map below to set) ') 
                  }
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          :
          <Grid.Row>
            <Grid.Column>
              <span className="label-count-location">Net requested at { this.props.netRequested } ! Thanks</span>
            </Grid.Column>
          </Grid.Row>
        }
      </div>
    )
  }
}

export default InputCourtInfo
