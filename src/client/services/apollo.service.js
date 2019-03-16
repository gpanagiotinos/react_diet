import ApolloBoostClient from 'apollo-boost'
import gql from 'graphql-tag'
import fetch from 'isomorphic-fetch'
export  const apollo = {
  client,
  apolloQuery
}
const client = new ApolloBoostClient({
  uri: 'http://localhost:3001/graphql',
  fetch: fetch
})

const GET_USDADATA = gql`query getUSDAData($text: String!, $offset: Int!) {getUSDAData(text: $text, offset: $offset)
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

function apolloQuery (query) {
  switch (query) {
    case 'GET_USDADATA':
      return (text, offset) => {
          return client.query({
          query: GET_USDADATA,
          variables: {text: text, offset: offset}
        })
      }
    case 'GET_USDANUTRITION':
      return (ndbno) => {
          return client.query({
          query: GET_USDANUTRITION,
          variables: {ndbno: ndbno}
        })
      }
    default:
      break;
  }

}