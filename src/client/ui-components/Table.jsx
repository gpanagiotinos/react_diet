import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import TableBody from './TableBody.jsx'
class Table extends React.Component{
  constructor(props) {
    super(props)
    this.handleTableHead = this.handleTableHead.bind(this)
    this.handleTableActions = this.handleTableActions.bind(this)
  }
  handleTableHead () {
    return (<thead>
    <tr>
      {this.props.tableHead.map((value, index) => {
        return <th key={index}>{value}</th>
      })}
    </tr>
  </thead>)
  }
  handleTableActions (actions = []) {
    return <ul className='level-left'>
      {
        actions.map((object) => {
          return <li className='level-item'><span className='icon'><a><FontAwesomeIcon icon={['fas', object.icon]}/></a></span></li>
        })
      }
    </ul>
  }
  render () {
    return (
      <table className='table is-bordered is-fullwidth'>
        {this.handleTableHead()}
        <TableBody />
      </table>
    )
  }
}
function mapStateToProps(state) {
  const {tableHead} = state.table
  return {tableHead}
}
export default connect(mapStateToProps)(Table)