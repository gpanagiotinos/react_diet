import React from 'react'
import { connect } from 'react-redux'

import Input from '../ui-components/Input.jsx'
import Button from '../ui-components/Button.jsx'
import { userActions } from '../redux/actions'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLoggedIn = this.handleLoggedIn.bind(this)
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleLoggedIn(e) {
        const {username, password} = this.state
        const dispatch = this.props.dispatch
        if (username && password) {
            dispatch(userActions.login(username, password))
        }

    }
    render () {
        return (
            <div className='columns is-mobile is-centered'>
                <div className='column is-half'>
                    <p className='title is-1'>
                        Log in
                    </p>
                    <Input type='username' label='Username' name='username' value={this.state.username} onInputChange={this.handleChange} leftIcon='user'/>
                    <Input type='password' label='Password' name='password' value={this.state.password} onInputChange={this.handleChange} leftIcon='lock' rightIcon = 'eye'/>
                    <Button label='Log in' bulmaType='link' onButtonClick={this.handleLoggedIn}/>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication
    return {
        loggingIn
    }
}
export default connect(mapStateToProps)(Login)