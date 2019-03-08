import React from 'react'
import {connect} from 'react-redux'
class Table extends React.Component{
  constructor(props) {
    super(props)
    this.handleTableHead = this.handleTableHead.bind(this)
    this.handleTableBody = this.handleTableBody.bind(this)
  }
  handleTableHead () {
    return <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
  }
  handleTableBody () {
    return <tbody>
      <tr>
        <td></td>
      </tr>
    </tbody>
  }
  render () {
    return (
      <table>
        {/* {this.handleTableHead}
        {this.handleTableBody} */}
      </table>
    )
  }
}
function mapStateToProps(state) {
  const {data} = state.table
  console.log(state.table)
  return {data}
}
export default connect(mapStateToProps)(Table)