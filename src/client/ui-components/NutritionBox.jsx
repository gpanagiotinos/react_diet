import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class NutritionBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foodDesc: this.props.foodDesc,
      foodNutrients: this.props.foodNutrients
    }
  }
  render () {
    return (
      <td colSpan='5'>
        <div className='box section'>
          <div className='columns is-multiline is-mobile'>
            <div className='column is-12'>
              <p>
                <span className='title is-bold'>{this.state.foodDesc.name}</span>
              </p>
              <p className='tagline'>
                {this.state.foodDesc.sd}
              </p>
            </div>
            <div className='column is-12'>
            <div className='panel-block'>
              <div className='columns is-multiline'> 
                {
                  this.state.foodNutrients.map((nutrition) => {
                    return (
                      <div className='column is-3 field'>
                        <div className='control'>
                          <span key={nutrition.nutrient_id} className='tags are-medium has-addons'>
                            <span className='tag is-info'>{nutrition.name}</span>
                            <span className='tag is-light'>{nutrition.value}</span>
                          </span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            </div>
          </div>
        </div>
      </td>
    )
  }
}