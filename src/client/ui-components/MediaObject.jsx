import React from 'react'
import NutritionRow from './NutritionRow.jsx'
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
  }
  handleMediaObjectArray () {
    if (this.props.mediaObjectArray.length > 0) {
      return this.props.mediaObjectArray.map((object, index) => {
        return (
        <div className='box'>
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
  return {mediaObjectArray}
}
export default connect(mapStateToProps)(MediaObject)