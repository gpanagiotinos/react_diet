import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
export default class Input extends React.Component {
    constructor (props) {
        super(props)
        this.InputRef = React.createRef()
        this.state = {
            placeholder: this.props.placeholder,
            type: this.props.type,
            id: this.props.id,
            value: '',
            label: this.props.label,
            leftIcon: this.props.leftIcon,
            rightIcon: this.props.rightIcon
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleInputClass = this.handleInputClass.bind(this)
        this.handleInputType = this.handleInputType.bind(this)
        this.handleInputIcons = this.handleInputIcons.bind(this)
    }
    handleChange(e) {
        e.persist()
        this.setState((prevState, props) => {
            value: e.target.value
        })
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
    handleInputIcons() {
        let htmlIcon = null
        if (this.state.leftIcon !== undefined) {
            htmlIcon += <span class="icon is-small is-left"><FontAwesomeIcon icon={['fas', this.state.leftIcon]} /></span>
        }
        if (this.state.rightIcon !== undefined) {
            htmlIcon += <span class="icon is-small is-right"><FontAwesomeIcon icon={['fas', this.state.rightIcon]} /></span>
        }
        return htmlIcon
    }
    render () {
        return (
            <div className='field'>
                <p className='control'>
                    <label className='label'>{this.state.label}</label>
                    <input className='input' type={this.handleInputType()} ref={this.InputRef} id= {this.state.id} placeholder={this.state.placeholder} onChange={this.handleChange}/>
                    {this.handleInputIcons()}
                </p>
            </div>
        )
    }
}
