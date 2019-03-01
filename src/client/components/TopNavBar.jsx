import React from 'react'
import RouterAuth from '../ui-components/RouterAuth.jsx'
import {connect} from 'react-redux'
class TopNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleAccessibleRouter = this.handleAccessibleRouter.bind(this)
    }
    handleAccessibleRouter () {
        console.log('router access')
        return <div className='navbar-end'>
        {
            <RouterAuth />
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
export default connect()(TopNavBar)