import React, {Component} from 'react'

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: this.props.src,
      width: this.props.width,
      height: this.props.height
    }
  }
  render () {
    return (
      <figure className='image' style={{width: this.state.width, height: this.state.height}}>
        <img src={process.env.API_URL + process.env.PORT + '/static/img/' + this.state.src}/>
      </figure>
    )
  }
}