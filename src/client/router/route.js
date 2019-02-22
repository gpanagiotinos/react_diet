import React from 'react'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'

export default [
    {
        name: 'Login',
        path: '/login',
        key: 'login',
        role: ['all'],
        main: () => <Login />
    },
    {
        name: 'Register',
        path: '/register',
        key: 'register',
        role: ['all'],
        main: () => <Register />
    }
]