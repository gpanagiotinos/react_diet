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

function apolloQuery (text, offset) {
  return client.query({
    query: GET_USDADATA,
    variables: {text: text, offset: offset}
  })
}