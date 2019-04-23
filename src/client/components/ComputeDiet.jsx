import React from 'react'
import {connect} from 'react-redux'
import Button from '../ui-components/Button.jsx'
import fetch from 'isomorphic-fetch'

class ComputeDiet extends React.Component {
  constructor (props) {
    super(props)
    this.handleComputeDiet = this.handleComputeDiet.bind(this)
  }
  handleComputeDiet () {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
  }
    fetch(`/diet/compute_foods`, requestOptions).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
    
  }
  render () {
    return (
      <Button key={'computeDiet'} label='Diet' bulmaType='link' onButtonClick={this.handleComputeDiet}/>
    )
  }
}
export default ComputeDiet