import React from 'react'
import RouterAuth from '../ui-components/RouterAuth.jsx'
import RouterLink from '../ui-components/RouterLink.jsx'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
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
            <div className='navbar-start'>
                <div className='navbar-brand'>
                    <RouterLink
                        navLinkClassName={'navbar-item'}
                        key= {'home'}
                        to={'/'}
                        text={'Home'}
                        icon={'logo.png'}
                    />
                </div>
            </div>
            {this.handleAccessibleRouter()}
        </nav>
      )
    }
}
export default withRouter(connect()(TopNavBar))