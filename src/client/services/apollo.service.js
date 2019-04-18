import ApolloBoostClient from 'apollo-boost'
import React from 'react'
import gql from 'graphql-tag'
import fetch from 'isomorphic-fetch'
import { Query } from 'react-apollo'
import InfinityScroll from '../help-components/InfinityScroll.jsx'
import {TableBodyRow} from '../ui-components/TableBodyRow.jsx'

export const apollo = {
  apolloQuery,
  apolloMutation
}
export const client = new ApolloBoostClient({
  uri: `/graphql`,
  fetch: fetch,
  addTypename: false,
  onError: (error) => apolloError(error)
})

const QueryComponents = {
  'TableBodyRow': TableBodyRow
}

export const GetUSDAData = (text, foodGroup, offset, max, componentKey) => {
  let itemsArray = []
  return (<Query query={GET_USDADATA} variables={{text, foodGroup, offset, max}}fetchPolicy="cache-and-network">
  {
    ({loading, error, data, fetchMore, networkStatus}) => {
        if (data.getUSDAData !== undefined) {
          itemsArray = [...data.getUSDAData.list.item.map((item) => {
            delete item['__typename']
            return {...item}
          })]
        }
        if (!error) {
        return (
          <>
          {itemsArray.map((item) => {
            return React.createElement(QueryComponents[componentKey], {key: item.ndbno, itemObject: item})
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
            (loading ? <div className='is-fullwidth'><div className='element is-loading'></div></div> : null)
          }
          </>
          )
        }
      return (null)
    }
  }
  </Query>)
}

const GET_USDADATA = gql`query getUSDAData($text: String!, $foodGroup: String!, $offset: Int!, $max: Int!) {getUSDAData(text: $text, foodGroup: $foodGroup, offset: $offset, max: $max)
    {
      list 
      { 
        start
        end
        total
        item 
        {
          name
          group
          ds
          ndbno
          manu
        }
      }
    }
}`
const GET_USDANUTRITION = gql`query getUSDANutritionData($ndbno: String!) {getUSDANutritionData(ndbno: $ndbno)
  {
    foods 
    { 
      food
      {
        sr
        type
        desc {
          ndbno
          name
          sd
          fg
          sn
          cn
          nf
          cf
          ff
          pf
          r
          rd
          ds
          manu
          ru
        }
        ing {
          desc
          upd
        }
        nutrients 
        {
          nutrient_id
          name
          derivation
          group
          unit
          value
          measures 
          {
            label
            eqv
            eunit
            qty
            value
          }
        }
      }
    }
  }
}`
const GET_USDALISTDATA = gql`query getUSDAListData($lt: String!, $max: Int!, $offset: Int!, $sort: String!, $format: String!)
{
  getUSDAListData(lt: $lt, max: $max, offset: $offset, sort: $sort, format: $format) {
    list {
      item
      {
        offset
        id
        name
      }
    }
  }
}`
const GET_USDASEARCHLIST = gql`query getUSDAData($text: String!, $foodGroup: String!, $offset: Int!, $max: Int!) {getUSDAData(text: $text, foodGroup: $foodGroup, offset: $offset, max: $max)
  {
    list 
      { 
        item 
        {
          offset
          ndbno
          name
        }
      }
  } 
}`

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
const SET_USDAFOOD = gql`
  mutation setUSDAFood($food: USDAFoodInput!){
    setUSDAFood(food: $food) {
      desc {
        ndbno
        name
      }
    }
  }`

function apolloMutation(mutation) {
  switch (mutation) {
    case 'SET_USDAFOOD':
      return (food) => {
        return client.mutate({
          mutation: SET_USDAFOOD,
          variables: {food: food},
          onError: (error) => {console.log('error', error)}
        })
      }
  }
}
const apolloError = ({graphQLErrors, networkError}) => {
  console.log('apollo Error')
    if(graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) => {
        return `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      })
    }
    if (networkError) {
      return `[Network error]: ${networkError}`
    }
}