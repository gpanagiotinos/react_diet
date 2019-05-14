import {NavLink} from 'react-router-dom'
import React from 'react'
import Image from '../ui-components/Image.jsx'
class RouterLink extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            to: this.props.to,
            text: this.props.text,
            navLinkClassName: this.props.navLinkClassName,
            icon: this.props.icon
        }
        this.handleRouterLinkIcon = this.handleRouterLinkIcon.bind(this)
    }
    handleRouterLinkIcon () {
        if (this.state.icon !== undefined) {
            return (
                <NavLink activeClassName='' className={this.state.navLinkClassName} exact={true} to={this.state.to}>
                    <Image src={this.state.icon} width={'48px'} height={'48px'}/>
                </NavLink>
            ) 
        } else {
            return (
                <NavLink activeClassName='is-active' className={this.state.navLinkClassName} exact={true} to={this.state.to}>
                    {this.state.text}
                </NavLink>
            ) 
        }
    }
    render () {
        return (this.handleRouterLinkIcon())
    }
}
export default RouterLink