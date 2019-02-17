import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
export default class Input extends React.Component {
    constructor (props) {
        super(props)
        // this.InputRef = React.createRef()
        this.state = {
            placeholder: this.props.placeholder,
            type: this.props.type,
            name: this.props.name,
            id: this.props.id,
            value: '',
            label: this.props.label,
            leftIcon: this.props.leftIcon,
            rightIcon: this.props.rightIcon, 
            onInputChange: this.props.onInputChange
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleInputClass = this.handleInputClass.bind(this)
        this.handleInputType = this.handleInputType.bind(this)
        this.handleInputLeftIcons = this.handleInputLeftIcons.bind(this)
        this.handleInputRightIcons = this.handleInputRightIcons.bind(this)
        this.handleShowPassword = this.handleShowPassword.bind(this)
    }
    handleChange(e) {
        e.persist()
        this.setState((prevState, props) => ({
            value: e.target.value
        }))
        this.state.onInputChange(e)
    }
    handleInputClass() {
        switch (this.state.type) {
            case 'username':
            break
            case 'password':
            break
        }
    }
    handleInputType() {
        switch (this.state.type) {
            case 'username':
                return 'text'
            break
            case 'password':
                return 'password'
            break
        }
    }
    handleInputLeftIcons() {
        if (this.state.leftIcon !== undefined) {
            return <span className='icon is-small is-left'><FontAwesomeIcon icon={['fas', this.state.leftIcon]} /></span>
        }
    }
    handleInputRightIcons() {
        if (this.state.name === 'password') {
            return <span className='icon is-small is-right' style={{pointerEvents: 'initial'}}><a onClick={this.handleShowPassword}><FontAwesomeIcon icon={['fas', this.state.rightIcon]} /></a></span>
        } else if (this.state.rightIcon !== undefined) {
            return <span className='icon is-small is-right'><FontAwesomeIcon icon={['fas', this.state.rightIcon]} /></span>
        }
    }
    handleShowPassword() {
        this.setState((prevState, props) => ({
            rightIcon: prevState.rightIcon === 'eye-slash' ? 'eye' : 'eye-slash',
            type: prevState.type === 'password' ? 'text' : 'password'
        }))
    }
    render () {
        return (
            <div className='field'>
                <label className='label'>{this.state.label}</label>
                <p className={'control' + (this.state.leftIcon ? ' has-icons-left': '') + (this.state.rightIcon  ? ' has-icons-right': '')}>
                    <input className='input' type={this.handleInputType()} ref={this.InputRef} name={this.state.name} id= {this.state.id} placeholder={this.state.placeholder} onChange={this.handleChange}/>
                    {this.handleInputLeftIcons()}
                    {this.handleInputRightIcons()}
                </p>
            </div>
        )
    }
}
