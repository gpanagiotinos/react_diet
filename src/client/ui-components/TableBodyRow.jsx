import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
export default class TableBodyRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemObject: this.props.itemObject,
      itemActions: this.props.itemActions,
      templateActionLoad: 'default',
      template: null
    }
    this.handleTableBodyRowAction = this.handleTableBodyRowAction.bind(this)
    this.handleTableBodyRowTemplate = this.handleTableBodyRowTemplate.bind(this)
  }
  handleTableBodyRowAction (action, args, object) {
    const argsArray = args.map((key) => {
      return object[key]
    })
    this.setState(({prevState, props}) => {
      return {
        templateActionLoad: 'action',
        template: action.apply(null, argsArray)
      }
    })
    console.log(action.apply(null, argsArray))
  }
  handleTableBodyRowTemplate () {
    switch (this.state.templateActionLoad) {
      case 'default':
        return (<tr key={this.props.key}>{Object.keys(this.state.itemObject).map((key, index) => {
          if (index === (Object.keys(this.state.itemObject).length - 1)) {
            return (<><td key={key}>{this.state.itemObject[key]}</td><td key={index}>
                  <ul className='level-left'>
                    {
                      this.state.itemActions.map((object) => {
                        return <li className='level-item'><span className='icon'><a onClick={() => this.handleTableBodyRowAction(object.action, object.actionArgs, this.state.itemObject)}><FontAwesomeIcon icon={['fas', object.icon]}/></a></span></li>
                      })
                    }
                  </ul>
                </td>
            </>)
          } else {
            return (<td key={key}>{this.state.itemObject[key]}</td>)
          }
        })}</tr>)
        break
        case 'action':
        return (<tr><>
            {this.state.template}
            <td>
                  <ul className='level-left'>
                    {
                      this.state.itemActions.map((object) => {
                        return <li className='level-item'><span className='icon'><a onClick={() => this.handleTableBodyRowAction(object.action, object.actionArgs, this.state.itemObject)}><FontAwesomeIcon icon={['fas', object.icon]}/></a></span></li>
                      })
                    }
                  </ul>
                </td>
            </></tr>)
        break
    }
  }
  render() {
    return (this.handleTableBodyRowTemplate())
  }
}
