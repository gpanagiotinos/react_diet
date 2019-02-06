import React, {Component} from 'react'

class App extends Component {
    componentDidMount () {
        fetch('localhost:8090/graphql')
            .then((response) => {
                console.log(response)
            })
    }
    render () {
       return ( 
       <div> 
            App Component
        </div>
       )
    }
}
export default App