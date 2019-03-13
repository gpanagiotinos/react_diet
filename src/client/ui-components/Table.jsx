import React from 'react'
import {connect} from 'react-redux'
class Table extends React.Component{
  constructor(props) {
    super(props)
    this.state
    this.handleTableHead = this.handleTableHead.bind(this)
    this.handleTableBody = this.handleTableBody.bind(this)
    this.handleVisibilityHead = this.handleVisibilityHead.bind(this)
  }
  handleVisibilityHead () {
    const arrayHead = [...this.props.tableData.head.map((value, index) => {
        if (value.visible) {
          return value.text
        }
      })]
      return arrayHead
  }
  handleTableHead () {
    if (this.props.requestResolved) {
      return <thead>
          <tr>
            {this.props.tableData.head.map((value, index) => {
              console.log(value)
              if (value.visible) {
                return <th key={index}>{value.text}</th>
              }
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
                  Object.keys(item).forEach((value) => {
                    console.log(value)
                    if (this.props.tableData.head[value].visible) {
                      return <td>{item[value]}</td>
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
  render () {
    return (
      <table>
        {this.handleTableHead()}
        {this.handleTableBody()}
      </table>
    )
  }
}
function mapStateToProps(state) {
  const {requestResolved, tableData} = state.table
  console.log({requestResolved, tableData})
  return {requestResolved, tableData}
}
export default connect(mapStateToProps)(Table)