import React, { Component } from 'react'
import { Grid, Input } from 'semantic-ui-react'
import './NetInfoInputs.less'

class NetInfoInputs extends Component {
  render() {
    return (
      <div className="net-info-inputs">
        <Grid columns='equal'>
          <Grid.Column>
            <h4>Court Name</h4>
            { this.props.courtName ? 'PARK NAME' : 'Select court from map below' }
          </Grid.Column>
          <Grid.Column>
            <h4>Cour Name</h4>
            <Input />
          </Grid.Column>
          <Grid.Column>
            <h4>Cour Name</h4>
            <Input />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default NetInfoInputs

