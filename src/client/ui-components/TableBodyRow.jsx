import React from 'react'

export const TableBodyRow = (props) => {
  return (<tr key={props.key}>{Object.keys(props.itemObject).map((key) => {
    return (<td key={key}>{props.itemObject[key]}</td>)
  })}</tr>)
}