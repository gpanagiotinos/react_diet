import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class TableBody extends React.Component {
  constructor(props) {
    super(props)
    this.handleBodyTr = this.handleBodyTr.bind(this)
    this.handleBodyTd = this.handleBodyTd.bind(this)
    this.handleTableActions = this.handleTableActions.bind(this)
    this.handleActionClicked = this.handleActionClicked.bind(this)
  }
  handleActionClicked (args, action, service) {
    console.log('handleClick', args, action)
    this.props.dispatch(action(args, service))
  }
  handleTableActions (actions = []) {
    return <ul className='level-left'>
      {
        actions.map((object) => {
          return <li key={object.label} className='level-item'><span className='icon'><a onClick={() => this.handleActionClicked(object.args, object.action, object.service)}><FontAwesomeIcon icon={['fas', object.icon]}/></a></span></li>
        })
      }
    </ul>
  }
  handleBodyTd (item) {
    return Object.keys(item).map((value) => {
     if (this.props.tableData.head.indexOf(value) > -1 && value !== 'Actions') {
      return (<td key={value}>{item[value]}</td>)
     } else if (value === 'Actions') {
      return (<td key={value}>{this.handleTableActions(item[value])}</td>)
     }
    })
  }
  handleBodyTr () {
    if (this.props.requestResolved) {
      return this.props.tableData.body.map((item, index) => {
          return (<tr key={index}>{this.handleBodyTd(item)}</tr>)
        })
    } else {
      return null
    }
  }
  render () {
    return (
      <tbody>
        {this.handleBodyTr()}
      </tbody>
    )
  }
}
function mapStateToProps(state) {
  const {requestResolved, tableData} = state.table
  console.log(state.table)
  return {requestResolved, tableData}
}
export default connect(mapStateToProps)(TableBody)