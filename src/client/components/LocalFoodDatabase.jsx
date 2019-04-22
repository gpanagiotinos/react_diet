import React from 'react'
import {GetLocalFoodData} from '../services/apollo.service.js'
export default class LocalFoodDataBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      template: null
    }
  }
  componentDidMount () {
    this.setState(({prevState, props}) => {
      return {
        template: GetLocalFoodData()
      }
    })
    
  }
  render () {
    return (this.state.template)
  }
}