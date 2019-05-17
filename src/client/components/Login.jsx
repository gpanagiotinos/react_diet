import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import Input from '../ui-components/Input.jsx'
import Button from '../ui-components/Button.jsx'
import { userActions, alertActions } from '../redux/actions'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.InputReferences = {}
        this.state = {
            username: '',
            password: '',
            submitted: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLoggedIn = this.handleLoggedIn.bind(this)
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value,
            submitted: false
        })
    }
    handleLoggedIn(e) {
        e.preventDefault()
        const {username, password} = this.state
        const dispatch = this.props.dispatch
        if (username && password) {
            this.setState({ submitted: true })
            dispatch(userActions.login(username, password, this.props.history))
        } else {
            ['username', 'password'].map((value) => {
                if(this.state[value] === '') {
                    dispatch(alertActions.errorInput(capitalize(value) + ' is Required', value))
                    this.InputReferences[value].InputRef.current.focus()
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
                <form className='column is-half'>
                    <p className='title is-1'>
                        Log in
                    </p>
                    <Input ref={(ref) => (this.InputReferences['username'] = ref)} type='username' label='Username' name='username' value={this.state.username} onInputChange={this.handleChange} onEnterPress={this.handleLoggedIn} leftIcon='user'/>
                    <Input ref={(ref) => (this.InputReferences['password'] = ref)} type='password' label='Password' name='password' value={this.state.password} onInputChange={this.handleChange} onEnterPress={this.handleLoggedIn} leftIcon='lock' rightIcon = 'eye-slash'/>
                    <Button key={'logIn'} label='Log in' bulmaType='link' loadingButton={this.state.submitted} onButtonClick={this.handleLoggedIn}/>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication
    return {loggingIn}
}
export default withRouter(connect(mapStateToProps)(Login))