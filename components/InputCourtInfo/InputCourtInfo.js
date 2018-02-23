import React, { Component } from 'react'
import { Grid, Input, Button } from 'semantic-ui-react'
import './InputCourtInfo.less'

class InputCourtInfo extends Component {
  render() {
    return (
      <div className="net-info-inputs">
        <Grid columns='equal' stackable>
          <Grid.Column>
            <h4>Court Name</h4>
            <h5>{ this.props.courtName ? 'PARK NAME' : '(tap park below to select)' }</h5>
          </Grid.Column>
          <Grid.Column>
            <h4>Number of Nets needed </h4>
            <Input type="number" placeholder="#" />
          </Grid.Column>
          <Grid.Column>
            <h4>Number of Hoops at court</h4>
            <Input type="number" placeholder="#" />
          </Grid.Column>
          <Grid.Column>
            <h4>Any notes</h4>
            <Input type="text" placeholder="(optional)" />
          </Grid.Column>
          <Grid.Column>
            <h4>&nbsp;</h4>
            <Button>
              Request
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default InputCourtInfo

