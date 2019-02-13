import React from 'react'

export default class Input extends React.Component {
    constructor (props) {
        super(props)
        this.InputRef = React.createRef()
        this.state = {
            placeholder: this.props.placeholder,
            type: this.props.type,
            id: this.props.id,
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        e.persist()
        this.setState((prevState, props) => {
            value: e.target.value
        })
    }
    render () {
        return (
            <div>
                <input type={this.state.type} ref={this.InputRef} id= {this.state.id} placeholder={this.state.placeholder} onChange={this.handleChange}/>
            </div>
        )
    }
}
