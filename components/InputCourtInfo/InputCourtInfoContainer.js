import React, { Component } from 'react'
import { Grid, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postNetRequest } from '../../_actions'

import InputCourtInfo from './InputCourtInfo'

class InputCourtInfoContainer extends Component {
  handleNetRequest = (data) => {
    const mergedData = {
      ...data,
      ...this.props.locationInfo
    }

    this.props.handleNetRequest(mergedData)
  }

  render() {
    return (
      <InputCourtInfo 
        locationInfo={ this.props.locationInfo } 
        handleNetRequest={ this.handleNetRequest }
        requestingNet={ this.props.requestingNet }
        netRequested={ this.props.netRequested }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationInfo: state.selectLocation.formattedAddress ? state.selectLocation : null,
    requestingNet: state.netRequest.posting,
    netRequested: state.netRequest.formattedAddress
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleNetRequest: (mergedData) => {
    dispatch(postNetRequest(mergedData)) 
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputCourtInfoContainer)
