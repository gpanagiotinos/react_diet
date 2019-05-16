import React from 'react'
import {connect} from 'react-redux'
import Button from '../ui-components/Button.jsx'
import Input from '../ui-components/Input.jsx'
import fetch from 'isomorphic-fetch'

class ComputeDiet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dietFoods: [],
      template: null,
      clickedIndex: null,
      energy: 1200,
      cardo: 50,
      protein: 20,
      sugar: 5,
      fat: 30,
      snack: 5,
      lunch: 30
    }
    this.handleComputeDiet = this.handleComputeDiet.bind(this)
    this.handleCalculate = this.handleCalculate.bind(this)
    this.handleResponseDiet = this.handleResponseDiet.bind(this)
    this.handleResponseDietSum = this.handleResponseDietSum.bind(this)
    this.handleFoodReport = this.handleFoodReport.bind(this)
    this.handleFoodTemplate = this.handleFoodTemplate.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(e) {
    const {name, value} = e.target
    this.setState({
        [name]: parseFloat(value)
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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({cardo: this.state.cardo, protein: this.state.protein, sugar: this.state.sugar, fat: this.state.fat})
  }
    fetch(`/diet/calculate`, requestOptions).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState((prevState, props) => {
        return {
          dietFoods:  data.Keys
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
    let DietObject = {
      Breakfast: {
        name: '',
        qty: 0,
        energy: 0,
        index: null
      },
      Brunch: {
        name: '',
        qty: 0,
        energy: 0,
        index: null
      },
      Dinner: {
        name: '',
        qty: 0,
        energy: 0,
        index: null
      },
      Supper: {
        name: '',
        qty: 0,
        energy: 0,
        index: null
      },
      Lunch: {
        name: '',
        qty: 0,
        energy: 0,
        index: null
      }
    }
    this.state.dietFoods.map((item, index) => {
      if (index === 0) {
        DietObject['Breakfast'].name = item.name
        DietObject['Breakfast'].qty = parseFloat((this.state.lunch * this.state.energy)/parseFloat(item.energy)).toFixed(2)
        DietObject['Breakfast'].energy = ((parseFloat(DietObject['Breakfast'].qty) * parseFloat(item.energy))/100).toFixed(2)
        DietObject['Breakfast'].index = index
      } else if (index === 1) {
        DietObject['Brunch'].name = item.name
        DietObject['Brunch'].qty = parseFloat((this.state.snack * this.state.energy)/parseFloat(item.energy)).toFixed(2)
        DietObject['Brunch'].energy = ((parseFloat(DietObject['Brunch'].qty) * parseFloat(item.energy))/100).toFixed(2)
        DietObject['Brunch'].index = index
      }
      else if (index === 2) {
        DietObject['Dinner'].name = item.name
        DietObject['Dinner'].qty = parseFloat((this.state.lunch * this.state.energy)/parseFloat(item.energy)).toFixed(2)
        DietObject['Dinner'].energy = ((parseFloat(DietObject['Dinner'].qty) * parseFloat(item.energy))/100).toFixed(2)
        DietObject['Dinner'].index = index
      }
      else if (index === 3) {
        DietObject['Supper'].name = item.name
        DietObject['Supper'].qty = parseFloat((this.state.snack * this.state.energy)/parseFloat(item.energy)).toFixed(2)
        DietObject['Supper'].energy = ((parseFloat(DietObject['Supper'].qty) * parseFloat(item.energy))/100).toFixed(2)
        DietObject['Supper'].index = index
      }
      else if (index === 4) {
        DietObject['Lunch'].name = item.name
        DietObject['Lunch'].qty = parseFloat((this.state.lunch * this.state.energy)/parseFloat(item.energy)).toFixed(2)
        DietObject['Lunch'].energy = ((parseFloat(DietObject['Lunch'].qty) * parseFloat(item.energy))/100).toFixed(2)
        DietObject['Lunch'].index = index
      }
    })
    return Object.keys(DietObject).map((key) => {
      let report = null
      if (key === 'Breakfast') {
        report = `Breakfast, Name: ${DietObject[key].name} ${DietObject[key].qty}(g) ${DietObject[key].energy}(kcal)`
      } else if (key === 'Brunch') {
        report = `Brunch, Name: ${DietObject[key].name} ${DietObject[key].qty}(g) ${DietObject[key].energy}(kcal)`
      }
      else if (key === 'Dinner') {
        report = `Dinner, Name: ${DietObject[key].name} ${DietObject[key].qty}(g) ${DietObject[key].energy}(kcal)`
      }
      else if (key === 'Supper') {
        report = `Supper,  Name: ${DietObject[key].name} ${DietObject[key].qty}(g) ${DietObject[key].energy}(kcal)`
      }
      else if (key === 'Lunch') {
        report = `Lunch, Name: ${DietObject[key].name} ${DietObject[key].qty}(g) ${DietObject[key].energy}(kcal)`
      }
      return (<a className='list-item' onClick={(e) => (this.handleFoodReport(e, DietObject[key].index))}>
      {report}
      {this.handleFoodTemplate(DietObject[key].index)}
      </a>)
    })
    // return this.state.dietFoods.map((item, index) => {
    //   let report = null
    //   if (index === 0) {
    //     report = `Breakfast, Name: ${item.name} ${parseFloat((this.state.lunch * this.state.energy)/parseFloat(item.energy)).toFixed(2)}(g)`
    //   } else if (index === 1) {
    //     report = `Brunch, Name: ${item.name} ${parseFloat((this.state.snack * this.state.energy)/parseFloat(item.energy)).toFixed(2)}(g)`
    //   }
    //   else if (index === 2) {
    //     report = `Dinner, Name: ${item.name} ${parseFloat((this.state.lunch * this.state.energy)/parseFloat(item.energy)).toFixed(2)}(g)`
    //   }
    //   else if (index === 3) {
    //     report = `Supper,  Name: ${item.name} ${parseFloat((this.state.snack * this.state.energy)/parseFloat(item.energy)).toFixed(2)}(g)`
    //   }
    //   else if (index === 4) {
    //     report = `Lunch, Name: ${item.name} ${parseFloat((this.state.lunch * this.state.energy)/parseFloat(item.energy)).toFixed(2)}(g)`
    //   }
    //   return (<a className='list-item' onClick={(e) => (this.handleFoodReport(e, index))}>
    //   {report}
    //   {this.handleFoodTemplate(index)}
    //   </a>)
    // })
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
        reportSum.qty += parseFloat(((parseFloat(this.state.lunch) * parseFloat(this.state.energy))/parseFloat(item.energy)))
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      } else if (index === 1) {
        reportSum.qty += parseFloat(((parseFloat(this.state.snack) * parseFloat(this.state.energy))/parseFloat(item.energy)))
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
      else if (index === 2) {
        reportSum.qty += parseFloat(((parseFloat(this.state.lunch) * parseFloat(this.state.energy))/parseFloat(item.energy)))
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
      else if (index === 3) {
        reportSum.qty += parseFloat(((parseFloat(this.state.snack) * parseFloat(this.state.energy))/parseFloat(item.energy)))
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
      else if (index === 4) {
        reportSum.qty += parseFloat(((parseFloat(this.state.lunch) * parseFloat(this.state.energy))/parseFloat(item.energy)))
        reportSum.Protein += parseFloat(item.protein)
        reportSum.Carbohydrate += parseFloat(item.cardo)
        reportSum.Sugar += parseFloat(item.sugar)
        reportSum.Fat += parseFloat(item.fat)
      }
    })
    Object.keys(reportSum).map((keys) => {
      reportSum[keys] = reportSum[keys].toFixed(2)
    })
    return (<div className='field is-grouped'>
      {Object.keys(reportSum).map((keys) => {
        return (<div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">{keys}</span>
          <span className="tag is-success">{reportSum[keys] + '(g)'}</span>
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
          {/* <Button key={'computeDiet'} label='Import Data' bulmaType='link' onButtonClick={this.handleComputeDiet}/> */}
          <Button key={'calculate'} label='Calculate' bulmaType='info' onButtonClick={this.handleCalculate}/>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static">
                Lunch
                </a>
              </div>
              <div className="control">
                <Input type='text' name='lunch' onInputChange={this.handleInputChange} value={this.state.lunch}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                %
                </a>
              </div>
              <div className="control">
                <a className="button is-static">
                Snack
                </a>
              </div>
              <div className="control">
                <Input type='text' name='snack' onInputChange={this.handleInputChange} value={this.state.snack}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                %
                </a>
              </div>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static">
                Energy
                </a>
              </div>
              <div className="control">
                <Input type='text' name='energy' onInputChange={this.handleInputChange} value={this.state.energy}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                kcal
                </a>
              </div>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static">
                Carbohydrate
                </a>
              </div>
              <div className="control">
                <Input type='text' name='cardo' onInputChange={this.handleInputChange} value={this.state.cardo}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                Carbohydrate, by difference(%)
                </a>
              </div>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static">
                Fat
                </a>
              </div>
              <div className="control">
                <Input type='text' name='fat' onInputChange={this.handleInputChange} value={this.state.fat}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                Total lipid (fat)(%)
                </a>
              </div>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static">
                Protein
                </a>
              </div>
              <div className="control">
                <Input type='text' name='protein' onInputChange={this.handleInputChange} value={this.state.protein}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                Protein(%)
                </a>
              </div>
            </div>
          </div>
          <div className='column is-12'>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static">
                Sugar
                </a>
              </div>
              <div className="control">
                <Input type='text' name='sugar' onInputChange={this.handleInputChange} value={this.state.sugar}></Input>
              </div>
              <div className="control">
                <a className="button is-static">
                Sugar(%)
                </a>
              </div>
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