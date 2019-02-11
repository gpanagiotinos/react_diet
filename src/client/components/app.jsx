import React, {Component} from 'react'
import {hot, setConfig} from 'react-hot-loader'
class App extends Component {
    componentDidMount () {
        fetch('http://localhost:3001/graphql')
            .then((response) => {
                console.log(response)
            })
    }
    render () {
       return ( 
       <div> 
            App Components
        </div>
       )
    }
}

export default App