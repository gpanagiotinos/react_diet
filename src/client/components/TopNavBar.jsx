import React from 'react'
import RouterAuth from '../ui-components/RouterAuth.jsx'

class TopNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleAccessibleRouter = this.handleAccessibleRouter.bind(this)
    }
    handleAccessibleRouter () {
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
export default TopNavBar