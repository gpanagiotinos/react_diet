import React from 'react'
import {connect} from 'react-redux'
import Button from '../ui-components/Button.jsx'
import fetch from 'isomorphic-fetch'

class ComputeDiet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dietFoods: [],
      template: null,
      clickedIndex: null
    }
    this.handleComputeDiet = this.handleComputeDiet.bind(this)
    this.handleCalculate = this.handleCalculate.bind(this)
    this.handleResponseDiet = this.handleResponseDiet.bind(this)
    this.handleResponseDietSum = this.handleResponseDietSum.bind(this)
    this.handleFoodReport = this.handleFoodReport.bind(this)
    this.handleFoodTemplate = this.handleFoodTemplate.bind(this)
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
      const dietFoods = data.Keys.slice(0, 5).map((item, index) => {
        if(!(index%2)) {
          return {...item, 
            cardo: ((item.cardo * item.gram320)/100).toFixed(2),
            protein: ((item.protein * item.gram320)/100).toFixed(2),
            sugar: ((item.sugar * item.gram320)/100).toFixed(2),
            fat: ((item.fat * item.gram320)/100).toFixed(2)
          }
        } else {
          return {...item, 
            cardo: ((item.cardo * item.gram60)/100).toFixed(2),
            protein: ((item.protein * item.gram60)/100).toFixed(2),
            sugar: ((item.sugar * item.gram60)/100).toFixed(2),
            fat: ((item.fat * item.gram60)/100).toFixed(2)
          }
        }
      })
      console.log(dietFoods)
      this.setState((prevState, props) => {
        return {
          dietFoods: dietFoods
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  handleFoodReport (e, index) {
    console.log(this.state.dietFoods[index], index)
    const template = (<div className='field is-grouped is-grouped-multiline'>
      {Object.keys(this.state.dietFoods[index]).map((keys) => {
        return (<div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">{keys}</span>
          <span className="tag is-success">{this.state.dietFoods[index][keys] + '(g)'}</span>
        </div>
      </div>)
      })
      }
    </div>)
    this.setState(({prevState, props}) => {
      return {
        template: template,
        clickedIndex: index
      }
    })
  }
  handleFoodTemplate (index) {
    if (index === this.state.clickedIndex) {
      return this.state.template
    } else {
      return (null)
    }
    
  }
  handleResponseDiet () {
    return this.state.dietFoods.map((item, index) => {
      let report = null
      if (index === 0) {
        report = `Breakfast, Name: ${item.name} ${item.gram320}(g)`
      } else if (index === 1) {
        report = `Brunch, Name: ${item.name} ${item.gram60}(g)`
      }
      else if (index === 2) {
        report = `Dinner, Name: ${item.name} ${item.gram320}(g)`
      }
      else if (index === 3) {
        report = `Supper,  Name: ${item.name} ${item.gram60}(g)`
      }
      else if (index === 4) {
        report = `Lunch, Name: ${item.name} ${item.gram320}(g)`
      }
      return (<a className='list-item' onClick={(e) => (this.handleFoodReport(e, index))}>
      {report}
      {this.handleFoodTemplate(index)}
      </a>)
    })
  }
  handleResponseDietSum () {
    // Carbohydrate, by difference(%)
    // Total lipid (fat)(%)
    // Protein(%)
    // Sugar(%)
    let reportSum = {
      qty: 0,
      Protein: 0,
      Carbohydrate: 0,
      Fat: 0,
      Sugar: 0
    }
    this.state.dietFoods.map((item, index) => {
      if (index === 0) {
        reportSum.qty += parseFloat(item.gram320)
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      } else if (index === 1) {
        reportSum.qty += parseFloat(item.gram60)
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
      else if (index === 2) {
        reportSum.qty += parseFloat(item.gram320)
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
      else if (index === 3) {
        reportSum.qty += parseFloat(item.gram60)
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
      else if (index === 4) {
        reportSum.qty += parseFloat(item.gram320)
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
    })
    return (<div className='field is-grouped'>
      {Object.keys(reportSum).map((keys) => {
        return (<div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">{keys}</span>
          <span className="tag is-success">{reportSum[keys].toFixed(2) + '(g)'}</span>
        </div>
      </div>)
      })
      }
    </div>)
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
            <div className="field has-addons">
              <p className="control">
                <input className="input" value='1200' type="text" placeholder="Your email" disabled/>
              </p>
              <p className="control">
                <a className="button is-static">
                kcal
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
            <p className="control">
                <input className="input" value='50' type="text" placeholder="Your email" disabled/>
              </p>
              <p className="control">
                <a className="button is-static">
                Carbohydrate, by difference(%)
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
            <p className="control">
                <input className="input" value='30' type="text" placeholder="Your email" disabled/>
              </p>
              <p className="control">
                <a className="button is-static">
                Total lipid (fat)(%)
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
            <p className="control">
                <input className="input" value='20' type="text" placeholder="Your email" disabled/>
              </p>
              <p className="control">
                <a className="button is-static">
                Protein(%)
                </a>
              </p>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <p className="control">
                <input className="input" value='5' type="text" placeholder="Your email" disabled/>
              </p>
              <p className="control">
                <a className="button is-static">
                Sugar(%)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='column is-6 list is-hoverable'>
        {this.handleResponseDiet()}
        <a className='list-item'>{this.handleResponseDietSum()}</a>
      </div>
    </div>)
  }
}
export default ComputeDiet