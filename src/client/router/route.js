import React from 'react'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Home from '../components/Home.jsx'
import Logout from '../components/Logout.jsx'
import UsdaSearch from '../components/UsdaSearch.jsx'
import Diet from '../components/Diet.jsx'
import LocalFoodDatabase from '../components/LocalFoodDatabase.jsx'
import ComputeDiet from '../components/ComputeDiet.jsx'

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
        active: false,
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
        name: 'Local Food Data',
        path: '/localfooddata',
        key: 'localfooddata',
        role: ['Super User'],
        exact: true,
        active: false,
        main: () => <LocalFoodDatabase />
    },
    {
        name: 'Compute Diet',
        path: '/computediet',
        key: 'computediet',
        role: ['Super User'],
        exact: true,
        active: false,
        main: () => <ComputeDiet />
    },
    {
        name: 'USDASearch',
        path: '/usdasearch',
        key: 'usdaSearch',
        role: ['Super User', 'Admin'],
        exact: true,
        active: false,
        main: () => <UsdaSearch />
    },
    {
        name: 'Diet',
        path: '/diet',
        key: 'diet',
        role: ['Super User', 'Admin'],
        exact: true,
        active: false,
        main: () => <Diet />
    },
    {
        name: 'Logout(' + param + ')',
        path: '/logout',
        key: 'logout',
        role: ['all'],
        exact: true,
        active: false,
        main: () => <Logout />
    }
])