import React from 'react'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Home from '../components/Home.jsx'
import UserManagement from '../components/UserManagement.jsx'
import Logout from '../components/Logout.jsx'
import UsdaSearch from '../components/UsdaSearch.jsx'
import Diet from '../components/Diet.jsx'

export default (param = '') => ([
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
    // {
    //     name: 'Register',
    //     path: '/register',
    //     key: 'register',
    //     role: ['Super User'],
    //     exact: true,
    //     main: () => <Register />
    // },
    {
        name: 'User Management',
        path: '/usermanagement',
        key: 'usermanagement',
        role: ['Super Admin'],
        exact: true,
        main: () => <UserManagement />
    },
    {
        name: 'USDASearch',
        path: '/usdasearch',
        key: 'usdaSearch',
        role: ['Super User', 'Admin'],
        exact: true,
        main: () => <UsdaSearch />
    },
    {
        name: 'Diet',
        path: '/diet',
        key: 'diet',
        role: ['Super User', 'Admin'],
        exact: true,
        main: () => <Diet />
    },
    {
        name: 'Logout(' + param + ')',
        path: '/logout',
        key: 'logout',
        role: ['all'],
        exact: true,
        main: () => <Logout />
    }
])