import React from 'react'
import Input from '../ui-components/input.jsx'


export default class Searchusda extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            searchText: ''
        }
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
    }
    handleSearchSubmit () {
        console.log('Search: ', this.state)
    }
    handleUserInput (value) {
        console.log(value)
        this.setState((prevState, props) => ({
            searchText: value
        }))
    }
    render () {
        return (
            <div>
            <Input
                placeholder='search' type='text'
            />
            <button onClick={this.handleSearchSubmit}>Search</button>
            </div>
        )
    }
}