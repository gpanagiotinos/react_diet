import React from 'react'
import Input from '../ui-components/Input.jsx'
import Button from '../ui-components/Button.jsx'
import {usdaService} from '../services/usda.service.js'

class UsdaSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usdaSearch: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonChange = this.handleButtonChange.bind(this)
  }
  handleInputChange(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
  })
  }
  handleButtonChange(e) {
    usdaService.search(this.state.usdaSearch)
  }
  render () {
    return (
      <div className='columns is-mobile is-centered'>
        <div className='column is-half'>
          <Input type='search' label='Search USDA DataBase' name='usdaSearch' value={this.state.searchValue} onInputChange={this.handleInputChange}/>
          <Button label='Search' bulmaType='link' onButtonClick={this.handleButtonChange}/>
        </div>
      </div>
    )
  }
}
export default UsdaSearch