import React from 'react'
import {withRouter} from 'react-router'
import RouterLink from '../ui-components/RouterLink.jsx'
import routes from '../router/route'
import {connect} from 'react-redux'

class TopNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleAccessibleRouter = this.handleAccessibleRouter.bind(this)
    }
    handleAccessibleRouter () {
        return <div className='navbar-start'>
        {
            routes.map((route) => (
                    <RouterLink
                        navLinkClassName='navbar-item'
                        key= {route.key}
                        to={route.path}
                        text={route.name}
                    />
            ))
        }
        </div>
    }
    render () {
        return (
        <nav className='navbar is-fixed-top is-light'>
            {this.handleAccessibleRouter()}
        </nav>
      )
    }
}
export default withRouter((TopNavBar))