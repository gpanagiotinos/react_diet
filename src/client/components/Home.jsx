import React from 'react'
import {connect} from 'react-redux'

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
export default Home