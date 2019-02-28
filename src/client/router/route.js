import React from 'react'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Home from '../components/Home.jsx'

export default [
    // {
    //     name: 'Home',
    //     path: '/',
    //     key: 'home',
    //     role:['all'],
    //     exact: true,
    //     main: () => <Home />
    // },
    {
        name: 'Login',
        path: '/login',
        key: 'login',
        role: ['all'],
        exact: true,
        main: () => <Login />
    },
    {
        name: 'Register',
        path: '/register',
        key: 'register',
        role: ['Super User'],
        exact: true,
        main: () => <Register />
    }

]