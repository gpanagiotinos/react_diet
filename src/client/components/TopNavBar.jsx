import React from 'react'
import {withRouter} from 'react-router'
import RouterLink from '../ui-components/RouterLink.jsx'
import routes from '../router/route'
import {connect} from 'react-redux'

class TopNavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div>
                <RouterLink to={'/login'} />
            </div>
        )
    }
}
export default withRouter((TopNavBar))