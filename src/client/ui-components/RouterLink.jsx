import {NavLink} from 'react-router-dom'
import React from 'react'

export default class RouterLink extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            to: this.props.to,
            text: this.props.text
        }
    }
    render () {
        return (
            <div>
                <NavLink to={this.state.to}>
                    {this.state.text}
                </NavLink>
            </div>
        )
    }
}