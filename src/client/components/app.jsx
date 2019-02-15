import React, {Component} from 'react'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import TopNavBar from './TopNavBar.jsx'
import Login from './Login.jsx'
class App extends Component {
    componentDidMount () {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({query: "{getUsers{username}}"})
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
        })
    }
    render () {
       return ( 
       <div>
            <Login/>
        </div>
       )
    }
}

export default App