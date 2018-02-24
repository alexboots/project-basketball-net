import React, { Component } from 'react'
import { Grid, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InputCourtInfo from './InputCourtInfo'

class InputCourtInfoContainer extends Component {
  handleRequest = (e) => {
    e.preventDefault()
    console.log('sup');
  }

  render() {
    return (
      <InputCourtInfo parkInfo={ this.props.parkInfo } />
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return { 
    parkInfo: state.parkInfo.fullAddress ? state.parkInfo : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  clickButton: () => {
    // dispatch(clickButton())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputCourtInfoContainer)
