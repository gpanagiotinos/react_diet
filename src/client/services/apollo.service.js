import ApolloBoostClient from 'apollo-boost'
import React from 'react'
import gql from 'graphql-tag'
import fetch from 'isomorphic-fetch'
import { Query } from 'react-apollo'
import InfinityScroll from '../help-components/InfinityScroll.jsx'

export const apollo = {
  apolloQuery,
  apolloMutation
}
export const client = new ApolloBoostClient({
  uri: `/graphql`,
  fetch: fetch,
  onError: (error) => apolloError(error)
})

export const GetUSDAData = (text, foodGroup, offset, max) => {
  return (<Query query={GET_USDADATA} variables={{text, foodGroup, offset, max}}fetchPolicy="cache-and-network">
  {
    ({loading, error, data, fetchMore, networkStatus}) => {
      if (!loading && !error) {
        console.log(data.getUSDAData.list.item.length)
      return (
        <>
        <InfinityScroll onLoadMore = {
          () => fetchMore({
            variables: {
              offset: parseInt(data.getUSDAData.list.item.length)
            }, 
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!loading) {
                console.log('waiting data')
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
        {data.getUSDAData.list.item.map((item, index) => {
          return (<tr>{Object.keys(item).map((key) => {
            if (key !== '__typename') {
              return (<td key={key}>{item[key]}</td>)
            } else if (key !== 'offset') {
              return (<td key={index}>{index}</td>)
            }
          })}</tr>)
        })}
        </>
        )
      } else if (loading && Object.keys(data).length < 1) {
        return (<div className='column is-12 element is-loading'></div>)
      } else if (error) {
        return (<div className='column is-12'>{error}</div>)
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
          offset
          group
          ndbno
          ds
          name
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