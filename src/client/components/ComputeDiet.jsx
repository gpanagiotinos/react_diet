import React from 'react'
import {connect} from 'react-redux'
import Button from '../ui-components/Button.jsx'
import fetch from 'isomorphic-fetch'

class ComputeDiet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dietFoods: []
    }
    this.handleComputeDiet = this.handleComputeDiet.bind(this)
    this.handleCalculate = this.handleCalculate.bind(this)
    this.handleResponseDiet = this.handleResponseDiet.bind(this)
  }
  handleResponseDiet () {
    console.log(this.state.dietFoods)
    return this.state.dietFoods.map((item, index) => {
      let report = null
      if (index === 0) {
        report = `Breakfast Name: ${item.name} ${item.gram320}(g)`
      } else if (index === 1) {
        report = `Brunch Name: ${item.name} ${item.gram60}(g)`
      }
      else if (index === 2) {
        report = `Dinner Name: ${item.name} ${item.gram320}(g)`
      }
      else if (index === 3) {
        report = `Supper  Name: ${item.name} ${item.gram60}(g)`
      }
      else if (index === 4) {
        report = `Lunch Name: ${item.name} ${item.gram320}(g)`
      }
      return (<a className='list-item'>{report}</a>)
    })
  }
  handleComputeDiet () {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
  }
    fetch(`/diet/compute_foods`, requestOptions).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    }) 
  }
  handleCalculate () {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
  }
    fetch(`/diet/calculate`, requestOptions).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      this.setState((prevState, props) => {
        return {
          dietFoods: data.Keys.slice(0, 5)
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  render () {
    return (<div className='columns is-multiline'>
      <div className='column is-6'>
        <div className='columns is-multiline'>
          <div className='column is-12'>
          <Button key={'computeDiet'} label='Import Data' bulmaType='link' onButtonClick={this.handleComputeDiet}/>
          <Button key={'calculate'} label='Calculate' bulmaType='info' onButtonClick={this.handleCalculate}/>
          </div>
          <div className='column is-12'>
            <div class="field has-addons">
              <p class="control">
                <input class="input" value='1200' type="text" placeholder="Your email" disabled/>
              </p>
              <p class="control">
                <a class="button is-static">
                kcal
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div class="field has-addons">
            <p class="control">
                <input class="input" value='50' type="text" placeholder="Your email" disabled/>
              </p>
              <p class="control">
                <a class="button is-static">
                Carbohydrate, by difference(%)
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div class="field has-addons">
            <p class="control">
                <input class="input" value='30' type="text" placeholder="Your email" disabled/>
              </p>
              <p class="control">
                <a class="button is-static">
                Total lipid (fat)(%)
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div class="field has-addons">
            <p class="control">
                <input class="input" value='20' type="text" placeholder="Your email" disabled/>
              </p>
              <p class="control">
                <a class="button is-static">
                Protein(%)
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div class="field has-addons">
              <p class="control">
                <input class="input" value='5' type="text" placeholder="Your email" disabled/>
              </p>
              <p class="control">
                <a class="button is-static">
                Sugar(%)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='column is-6 list is-hoverable'>
        {this.handleResponseDiet()}
      </div>
    </div>)
  }
}
export default ComputeDiet