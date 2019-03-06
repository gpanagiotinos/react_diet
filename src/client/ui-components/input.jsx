import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'
import {alertActions} from '../redux/actions'
class Input extends React.Component {
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
            onInputChange: this.props.onInputChange,
            required: this.props.required
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleInputClass = this.handleInputClass.bind(this)
        this.handleInputType = this.handleInputType.bind(this)
        this.handleInputLeftIcons = this.handleInputLeftIcons.bind(this)
        this.handleInputRightIcons = this.handleInputRightIcons.bind(this)
        this.handleShowPassword = this.handleShowPassword.bind(this)
        this.handleInputHelpMessage = this.handleInputHelpMessage.bind(this)
    }
    handleChange(e) {
        e.persist()
        this.setState((prevState, props) => ({
            value: e.target.value
        }))
        if (e.target.value.length ===  1) {
            this.props.dispatch(alertActions.clearInput(this.state.type))
        }
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
    handleInputHelpMessage() {
        if (this.props.helpMessage !== undefined && this.props.helpMessage !== null) {
            return <p className={'help ' + this.props.helpMessage.type}>{this.props.helpMessage.message}</p>
        } else {
            return null
        }
    }
    render () {
        return (
            <div className='field'>
                <label className='label'>{this.state.label}</label>
                <div className={'control' + (this.state.leftIcon ? ' has-icons-left': '') + (this.state.rightIcon  ? ' has-icons-right': '')}>
                    <input className='input' type={this.handleInputType()} ref={this.InputRef} name={this.state.name} id= {this.state.id} placeholder={this.state.placeholder} onChange={this.handleChange}/>
                    {this.handleInputLeftIcons()}
                    {this.handleInputRightIcons()}
                    {this.handleInputHelpMessage()}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state, props) {
    const helpMessage = state.alertInput.find((object) => {
        return object.input === props.type
    })
    // const helpMessage = {type: state.alertInput.type, message: state.alertInput.message, input: state.alertInput.input}
    return {helpMessage}
}
export default connect(mapStateToProps)(Input)