import React from 'react'
import { Query } from 'react-apollo'
import GraphqlErrorHandler from './GraphqlErrorHandler.jsx';

export default ({children, ...rest}) => (
  <Query errorPolicy='all' {...rest}>
    {result => (
      <GraphqlErrorHandler error={result.error}>
        {children(result)}
      </GraphqlErrorHandler>
    )} 
  </Query>
)