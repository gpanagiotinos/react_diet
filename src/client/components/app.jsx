import React, {Component} from 'react'
import Searchusda from './searchusda.jsx'
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
        <Searchusda/>
        </div>
       )
    }
}

export default App