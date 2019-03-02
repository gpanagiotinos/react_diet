import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import Input from '../ui-components/Input.jsx'
import Button from '../ui-components/Button.jsx'
import { userActions, alertActions } from '../redux/actions'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
        console.log(this.props)
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
        e.preventDefault()

        this.setState({ submitted: true })
        const {username, password} = this.state
        const dispatch = this.props.dispatch
        if (username && password) {
            dispatch(userActions.login(username, password, this.props.history))
        } else {
            ['username', 'password'].map((value) => {
                if(this.state[value] === '') {
                    console.log(value)
                    dispatch(alertActions.errorInput(capitalize(value) + ' is Required', value))
                }
            })
        }
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
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
    return {loggingIn}
}
export default withRouter(connect(mapStateToProps)(Login))