import React from 'react'
import Input from './Input.jsx'
import Button from './Button.jsx'
import {usdaActions, menuActions} from '../redux/actions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'


class MediaObject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleMediaObjectArray = this.handleMediaObjectArray.bind(this)
    this.handleMediaObjectTitle = this.handleMediaObjectTitle.bind(this)
    this.handleMediaObjectBody = this.handleMediaObjectBody.bind(this)
    this.handleMediaObjectMeasures = this.handleMediaObjectMeasures.bind(this)
    this.handleNutrientValue = this.handleNutrientValue.bind(this)
    this.handleNutrientRemove = this.handleNutrientRemove.bind(this)
  }
  handleMediaObjectMeasures (nutrient_id) {
    const nutrientItem = this.props.items.find((object) => {
      return object.id === nutrient_id
    })
    if (nutrientItem !== undefined) {
      const nutrientValue = nutrientItem.value
      return (<div className='field has-addons'>
      <div className='control'>
        <Input type={'number'} id={nutrientItem.id} value={nutrientValue} onInputChange={this.handleNutrientValue}/>
      </div>
      <div className='control'>
        <a className='button is-static'>
         g
        </a>
      </div>
    </div>)
    } else {
      return (null)
    }
  }
  handleNutrientValue (e, value) {
    const dispatch = this.props.dispatch
    dispatch(menuActions.increaseMenuItem(e.target.id, value))
  }
  handleNutrientRemove(e, value) {
    const dispatch = this.props.dispatch
    dispatch(usdaActions.usdaNutritionMediaObjectRemove(value))
  }
  handleMediaObjectArray () {
    if (this.props.mediaObjectArray.length > 0) {
      return this.props.mediaObjectArray.map((object, index) => {
        return (
        <div className='box column is-10 is-offset-1'>
          <article key={object.id} className='media'>
            <div className='media-content'>
              <div className='content'>
                <div>
                  {this.handleMediaObjectTitle(index)}
                  <div className='field is-grouped is-grouped-multiline'>
                    {
                      object.content.map((nutritionObj) => {
                        return (
                            <div key={nutritionObj['nutrient_id']} className='control'>
                                <div className='tags are-medium has-addons'>
                                    <span className='tag is-dark'>
                                        {nutritionObj['name']}
                                    </span>
                                    <span className='tag is-info'>
                                        {nutritionObj['value'] + nutritionObj['unit']}
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
          </article>
          <footer className='card-footer'>
            <div className='card-footer-item'>
              {this.handleMediaObjectMeasures(object.id)}
            </div>
            <div className='card-footer-item'>
              <Button label='Remove' value={object.id} bulmaType='danger' onButtonClick={this.handleNutrientRemove}/>
            </div>
          </footer>
        </div>
        )
      })
    } else {
      return (null)
    }
  }
  handleMediaObjectTitle (mediaIndex) {
    let titleElement = null
    let subtitleElement = null
    if (this.props.mediaObjectArray[mediaIndex].title !== null) {
      titleElement = React.createElement('strong', {className: '', key: mediaIndex+'title'}, this.props.mediaObjectArray[mediaIndex].title)
    }
    if (this.props.mediaObjectArray[mediaIndex].subtitle !== null) {
      subtitleElement = React.createElement('small', {className: '', key: mediaIndex+'subtitle'}, this.props.mediaObjectArray[mediaIndex].subtitle)
    }
    return [titleElement, subtitleElement]
  }
  handleMediaObjectBody () {}
  render () {
    return (this.handleMediaObjectArray())
  } 
}
function mapStateToProps(state, props) {
  const {mediaObjectArray} = state.mediaObject
  const {items} = state.menu
  return {mediaObjectArray, items}
}
export default connect(mapStateToProps)(MediaObject)