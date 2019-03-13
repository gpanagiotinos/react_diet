import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
class Table extends React.Component{
  constructor(props) {
    super(props)
    this.handleTableHead = this.handleTableHead.bind(this)
    this.handleTableBody = this.handleTableBody.bind(this)
    this.handleTableActions = this.handleTableActions.bind(this)
  }
  handleTableHead () {
    if (this.props.requestResolved) {
      return <thead>
          <tr>
            {this.props.tableData.head.map((value, index) => {
              return <th key={index}>{value}</th>
            })}
          </tr>
        </thead>
    } else {
      return null
    }
  }
  handleTableBody () {
    if (this.props.requestResolved) {
      return <tbody>
            {this.props.tableData.body.map((item, index) => {
                return <tr key={index}>
                {
                  Object.keys(item).map((value) => {
                    if (value === 'Actions') {
                      return <td key={value}>{this.handleTableActions(item[value])}</td>
                    } else if (this.props.tableData.head.indexOf(value) > -1) {
                      return <td key={value}>{item[value]}</td>
                    }
                  })
                }
                </tr>
            })}
    </tbody>
    } else {
      return null
    }
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
        {this.handleTableBody()}
      </table>
    )
  }
}
function mapStateToProps(state) {
  const {requestResolved, tableData} = state.table
  console.log(state.table)
  return {requestResolved, tableData}
}
export default connect(mapStateToProps)(Table)