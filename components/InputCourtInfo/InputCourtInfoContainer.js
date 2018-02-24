import React, { Component } from 'react'
import { Grid, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'

import InputCourtInfo from './InputCourtInfo'

class InputCourtInfoContainer extends Component {
  handleRequest = (data) => {
    // todo: move to redux action so UI updates to something else
    const mergedData = {
      ...data,
      ...this.props.parkInfo
    }

    console.log('mergedData ', mergedData );
    axios.post('http://localhost:3000/request/', mergedData)
    .then(function (response) {
      console.log(response);
      alert('requested!')
    })
    .catch(function (error) {
      console.log(error);
    }) 
  }

  render() {
    return (
      <InputCourtInfo 
        parkInfo={ this.props.parkInfo } 
        handleRequest={ this.handleRequest }
      />
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
    // { ...ownProps.parkInfo, 
    // dispatch(clickButton())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputCourtInfoContainer)
