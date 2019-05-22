import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            label: this.props.label,
            rightIcon: this.props.rightIcon,
            leftIcon: this.props.leftIcon,
            labelIcon: this.props.labelIcon,
            bulmaType: this.props.bulmaType,
            onButtonClick: this.props.onButtonClick,
            buttonCustomClass: this.props.buttonCustomClass,
            value: this.props.value,
            disable: this.props.disable !== undefined ? this.props.disable : false,
            loadingButton: this.props.loadingButton !== undefined ? this.props.loadingButton : false,
            buttonId: this.props.buttonId
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleButtonIcon = this.handleButtonIcon.bind(this)
        this.handleLabel = this.handleLabel.bind(this)
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
    handleLabel () {
        if (this.state.label !== undefined) {
            return (<span>{this.state.label}</span>)
        } else if (this.state.labelIcon !== undefined) {
            return (<span className='icon'><FontAwesomeIcon icon={['fas', this.state.labelIcon]} /></span>)
        } else {
            return (null)
        }
    }
    render () {
        return (
            <a id={this.state.buttonId} className={[this.state.buttonCustomClass !== undefined ? this.state.buttonCustomClass :  'button' + ' is-' + this.state.bulmaType] + [this.state.loadingButton ? ' is-loading':'']} onClick={this.handleClick}>
            {this.handleButtonIcon('left')}
            {this.handleLabel()}
            {this.handleButtonIcon('right')}
            </a>
        )
    }
}