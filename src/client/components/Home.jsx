import React from 'react'
import {connect} from 'react-redux'
import { userActions } from '../redux/actions'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className='columns is-mobile is-centered homeWrapper'>
                <div className='column is-half is-offset-one-quarter'>
                    <p className='title is-1 homeTitle'>
                        <span>Nutrition</span><span>Informatics</span>
                    </p>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { loggedIn } = state.initialState
    return {
        loggedIn
    }
}
export default connect(mapStateToProps)(Home)