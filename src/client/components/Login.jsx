import React from 'react'
import { connect } from 'react-redux'

import Input from '../ui-components/Input.jsx'
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
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        console.log(e.target)
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    render () {
        return (
            <div className='columns is-mobile is-centered'>
                <div className='column is-half'>
                    <p className='title is-1'>
                        Log in SuperFoods
                    </p>
                    <Input type='username' label='Username' value={this.state.username} onChange={this.handleChange} leftIcon='user'/>
                    <Input type='password' label='Password' value={this.state.password} onChange={this.handleChange} leftIcon='lock'/>
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