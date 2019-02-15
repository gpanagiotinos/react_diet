import React from 'react'
import Input from '../ui-components/Input.jsx'
export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div className='columns is-mobile is-centered'>
                <div className='column is-half'>
                    <p className='title is-1'>
                        Log in SuperFoods
                    </p>
                    <Input type='username' label='Username' leftIcon='user'/>
                    <Input type='password' label='Password' leftIcon='lock'/>
                </div>
            </div>
        )
    }
}