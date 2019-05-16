import React, {Component} from 'react'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import Notification from '../ui-components/Notification.jsx'
import TopNavBar from './TopNavBar.jsx'
import Main from './Main.jsx'
class App extends Component {
    render () {
       return ( 
       <div>
            <TopNavBar/>
            <Notification/>
            <Main/>
        </div>
       )
    }
}

export default App