import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            label: this.props.label,
            bulmaType: this.props.bulmaType,
            onButtonClick: this.props.onButtonClick,
            buttonCustomClass: this.props.buttonCustomClass,
            value: this.props.value
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick (e) {
        e.preventDefault()
        this.state.onButtonClick(e, this.state.value)
    }
    render () {
        return (
            <div className='control'>
                <a className={this.state.buttonCustomClass !== undefined ? this.state.buttonCustomClass :  'button' + ' is-' + this.state.bulmaType} onClick={this.handleClick}>{this.state.label}</a>
            </div>
        )
    }
}