import React from 'react'
import {connect} from 'react-redux'

class NutritionRow extends React.Component {
    constructor(props){
        super(props)
        console.log('Mount')
    }
    render () {
        return (
            <td><span>Nutrition Data</span></td>
        )
    }
}
function mapStateToProps(state) {
    const {requestResolved, rowData} = state.tableRow
    return {requestResolved, rowData}
}

export default connect(mapStateToProps)(NutritionRow)