import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            label: this.props.label,
            rightIcon: this.props.rightIcon,
            leftIcon: this.props.leftIcon,
            bulmaType: this.props.bulmaType,
            onButtonClick: this.props.onButtonClick,
            buttonCustomClass: this.props.buttonCustomClass,
            value: this.props.value,
            disable: this.props.disable !== undefined ? this.props.disable : false,
            loadingButton: this.props.loadingButton !== undefined ? this.props.loadingButton : false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleButtonIcon = this.handleButtonIcon.bind(this)
    }
    componentDidUpdate (prevProps) {
        if (prevProps.loadingButton !== this.props.loadingButton) {
            this.setState((prevState, props) => ({
                loadingButton: !prevState.loadingButton
            }))
        }
    }
    handleClick (e) {
        e.preventDefault()
        this.state.onButtonClick(e, this.state.value)
    }
    handleButtonIcon (iconSide) {
        switch (iconSide) {
            case 'left':
            if (this.state.leftIcon !== undefined) {
                return (<span className='icon is-small is-left'><FontAwesomeIcon icon={['fas', this.state.leftIcon]} /></span>)
            } else {
                return (null)
            }
            case 'right':
            if (this.state.rightIcon !== undefined) {
                return (<span className='icon is-small is-right'><FontAwesomeIcon icon={['fas', this.state.rightIcon]} /></span>)
            } else {
                return (null)
            }
        }
    }
    render () {
        return (
            <a className={[this.state.buttonCustomClass !== undefined ? this.state.buttonCustomClass :  'button' + ' is-' + this.state.bulmaType] + [this.state.loadingButton ? ' is-loading':'']} onClick={this.handleClick}>
            {this.handleButtonIcon('left')}
            <span>{this.state.label}</span>
            {this.handleButtonIcon('right')}
            </a>
        )
    }
}