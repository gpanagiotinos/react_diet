import ApolloBoostClient from 'apollo-boost'
import React from 'react'
import fetch from 'isomorphic-fetch'
import { Query } from 'react-apollo'
import ApolloQuery from './ApolloQuery.jsx'
import InfinityScroll from '../help-components/InfinityScroll.jsx'
import TableBodyRow from '../ui-components/TableBodyRow.jsx'
import NutritionBox from '../ui-components/NutritionBox.jsx'
import DropDown from '../ui-components/DropDown.jsx'


import {GET_USDADATA, GET_USDANUTRITION, GET_USDALISTDATA, GET_USDASEARCHLIST, GET_LOCALFOODDATA} from './apollo.tags.js'
import DropDownContent from '../ui-components/DropDownContent.jsx'

export const apollo = {
  apolloQuery,
  apolloMutation
}
export const client = new ApolloBoostClient({
  uri: `/graphql`,
  fetch: fetch
})

const QueryComponents = {
  'TableBodyRow': TableBodyRow
}
/**
 * Apollo Query with DropDown Component Response
 * @param {GraphQL Query} query 
 * @param {Query Arguments} args 
 * @param {Element ID} id 
 */
export const DropDownQuery = (query, args, id, onSelectId) => {
  let itemsArray = []
  console.log('onSelectId', onSelectId)
  return (
    <ApolloQuery query={query} variables={args} fetchPolicy="cache-and-network">
      {
        ({loading, error, data, fetchMore, networkStatus}) => {
          if (data.getUSDAData !== undefined && data.getUSDAData !== null) {
            if (data.getUSDAData.list !== null) {
              itemsArray = [...data.getUSDAData.list.item.map((item) => {
                delete item['__typename']
                return {...item, id: item.ndbno}
              })]
            }
          }
          if (!error) {
            return (
              <>
                <DropDownContent DropDownContentID={id + '-dropdown-content'} content={itemsArray} onSelectId={onSelectId}/>
                <InfinityScroll elementID={id + '-dropdown-content'} onLoadMore = {
                  () => fetchMore({
                    variables: {
                      offset: parseInt(data.getUSDAData.list.item.length)
                    }, 
                    updateQuery: (prev, { fetchMoreResult }) => {
                      console.log('infinity', loading)
                      if (loading) {
                        return prev
                      }
                      if (!fetchMoreResult) {
                        return prev
                      } 
                      return {...prev, getUSDAData: {
                        ...prev.getUSDAData, list: {
                          ...prev.getUSDAData.list, item: [
                            ...prev.getUSDAData.list.item, ...fetchMoreResult.getUSDAData.list.item
                          ]
                        }
                      }}
                    }})
                }/>
              </>
            )
          }
        }
      }
    </ApolloQuery>
  )
}

// Apollo Client Queries
/**
 * Get USDA Food Lists based on Text search
 * @param {*} text 
 * @param {*} foodGroup 
 * @param {*} offset 
 * @param {*} max 
 * @param {*} componentKey 
 * @param {*} actions 
 */
export const GetUSDAData = (text, foodGroup, offset, max, componentKey, actions = []) => {
  let itemsArray = []
  console.log({text, foodGroup, offset, max})
  return (<ApolloQuery query={GET_USDADATA} variables={{text, foodGroup, offset, max}} fetchPolicy="cache-and-network">
  {
    ({loading, error, data, fetchMore, networkStatus}) => {
        if (data.getUSDAData !== undefined) {
          if (data.getUSDAData.list !== null) {
            itemsArray = [...data.getUSDAData.list.item.map((item) => {
              delete item['__typename']
              return {...item}
            })]
          }
        }
        if (!error) {
        return (
          <>
          {itemsArray.map((item) => {
            return React.createElement(QueryComponents[componentKey], {key: item.ndbno, itemObject: item, itemActions: actions})
          })}
          <InfinityScroll onLoadMore = {
            () => fetchMore({
              variables: {
                offset: parseInt(data.getUSDAData.list.item.length)
              }, 
              updateQuery: (prev, { fetchMoreResult }) => {
                if (loading) {
                  return prev
                }
                if (!fetchMoreResult) {
                  return prev
                } 
                return {...prev, getUSDAData: {
                  ...prev.getUSDAData, list: {
                    ...prev.getUSDAData.list, item: [
                      ...prev.getUSDAData.list.item, ...fetchMoreResult.getUSDAData.list.item
                    ]
                  }
                }}
              }})
          }/>
          {
            (loading ? <td colSpan='6'><div className='container is-fullwidth has-text-centered'><div className='notification has-background-white element is-loading'></div></div></td> : null)
          }
          </>
          )
        }
      return (null)
    }
  }
  </ApolloQuery>)
}
/**
 * Get Nutrition Report for A USDA Food ndbno
 * @param {*} ndbno 
 */
export const GetUSDANutritionData = (ndbno) => {
  return (
    <ApolloQuery query={GET_USDANUTRITION} variables={{ndbno}} fetchPolicy="cache-and-network">
      {
        ({loading, error, data, networkStatus}) => {
          if (!loading && !error) {
            const {desc, nutrients} = data.getUSDANutritionData.foods[0].food
            return (<NutritionBox foodDesc={desc} foodNutrients={nutrients} />)
          } else {
            return (loading ? (<td colSpan='5'><div className='container is-fullwidth has-text-centered'><div className='notification has-background-white element is-loading'></div></div></td>) : null)
          }
        }
      }
    </ApolloQuery>
  )
}

export const GetLocalFoodData = () => {
  return (<ApolloQuery query={GET_LOCALFOODDATA} fetchPolicy="cache-and-network">
  {
    ({loading, error, data, fetchMore, networkStatus}) => {
      if (!loading && !error) {
        return (<div className='list is-hoverable'>
          {data.getLocalFoodData.map((item) => {
            return <a className='list-item'>{item.name}</a>
          })}
        </div>)
      } else {
        return (loading ? (<div className='section'>
        <div className='container'>
          <div className='columns is-multiline is-mobile'>
            <div className='is-fullwidth'><div className='element is-loading'></div></div>
          </div>
        </div>
      </div>) : null)
      }
    }
  }
  </ApolloQuery>)
}

function apolloQuery (query) {
  switch (query) {
    case 'GET_USDADATA':
      return (text, foodGroup, offset, max=25) => {
          return client.query({
          query: GET_USDADATA,
          variables: {text: text, foodGroup: foodGroup, offset: offset, max: max},
        })
      }
    case 'GET_USDASEARCHLIST':
      return (text, foodGroup, offset, max=25) => {
          return client.query({
          query: GET_USDASEARCHLIST,
          variables: {text: text, foodGroup: foodGroup, offset: offset, max: max}
        })
      }
    case 'GET_USDANUTRITION':
      return (ndbno) => {
          return client.query({
          query: GET_USDANUTRITION,
          variables: {ndbno: ndbno}
        })
      }
    case 'GET_USDALISTDATA': 
      return (lt, max, offset, sort, format) => {
        return client.query({
          query: GET_USDALISTDATA,
          variables: {lt: lt, max: max, offset: offset, sort: sort, format: format}
        })
      }
    default:
      break;
  }
}

function apolloMutation(mutation) {
  switch (mutation) {
    case 'SET_USDAFOOD':
      return (food) => {
        return client.mutate({
          mutation: SET_USDAFOOD,
          variables: {food: food}
        })
      }
  }
}