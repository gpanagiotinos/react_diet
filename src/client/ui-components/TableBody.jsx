import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NutritionRow from './NutritionRow.jsx'
class TableBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      componentRow: {
        componentKey: null,
        componentIndex: null
      }
    }
    this.components = {
      'NutritionRow': NutritionRow
    }
    this.handleBodyTr = this.handleBodyTr.bind(this)
    this.handleBodyTd = this.handleBodyTd.bind(this)
    this.handleTableActions = this.handleTableActions.bind(this)
    this.handleActionClicked = this.handleActionClicked.bind(this)
    this.handleDynamicRowComponent = this.handleDynamicRowComponent.bind(this)
    this.handleBodyTdActions = this.handleBodyTdActions.bind(this)
  }
  handleDynamicRowComponent(key) {
    console.log(key)
    if (key !== undefined && key !== '') {
      return React.createElement(this.components[key])
    } else {
      return (null)
    }  
  }
  handleActionClicked (args, action, service, component, index) {
    this.props.dispatch(action(args, service))
    this.setState((prevState, props) => {
      return {componentRow: {componentKey: component, componentIndex: index}}
    })
    console.log(args, action, service, component, index, this.state.componentRow)
  }
  handleTableActions (actions = [], index) {
    return <ul className='level-left'>
      {
        actions.map((object) => {
          return <li key={object.label} className='level-item'><span className='icon'><a onClick={() => this.handleActionClicked(object.args, object.action, object.service, object.component, index)}><FontAwesomeIcon icon={['fas', object.icon]}/></a></span></li>
        })
      }
    </ul>
  }
  handleBodyTd (item) {
    return Object.keys(item).map((value) => {
     if (this.props.tableData.head.indexOf(value) > -1 && value !== 'Actions') {
      return (<td key={value}>{item[value]}</td>)
     }
    })
  }
  handleBodyTdActions (item, index) {
    return Object.keys(item).map((value) => {
     if (value === 'Actions') {
       return (<td key={value}>{this.handleTableActions(item[value], index)}</td>)
      }
     })
  }
  handleBodyTr () {
    if (this.props.requestResolved) {
      return this.props.tableData.body.map((item, index) => {
        if (this.state.componentRow.componentIndex !== null && this.state.componentRow.componentIndex === index) {
          return ( <tr key={index}>
          {this.handleDynamicRowComponent(this.state.componentRow.componentKey)}
          {this.handleBodyTdActions(item, index)}
          </tr> )
        } else {
          return (<tr key={index}>
          {this.handleBodyTd(item)}
          {this.handleBodyTdActions(item, index)}
          </tr>)
        }
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
  return {requestResolved, tableData}
}
export default connect(mapStateToProps)(TableBody)