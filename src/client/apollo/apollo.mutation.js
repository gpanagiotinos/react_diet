import React from 'react'
import { Query, Mutation } from 'react-apollo'
import NutritionBox from '../ui-components/NutritionBox.jsx'
import {removeObjectAttribute} from '../redux/helpers'
import {GET_USDANUTRITION, SET_USDAFOOD} from './apollo.tags.js'
// Apollo Client Mutations 
export const SetUSDAFood = (ndbno) => {
  return (
  <Query query={GET_USDANUTRITION} variables={{ndbno}}>
    {({loading, error, data}) => {
      if (!loading && !error) {
        return data.getUSDANutritionData.foods.map((foodsObject) => {
          const {desc, nutrients} = foodsObject.food
          console.log({desc, nutrients})
          const food = {...{desc, nutrients}}
          return(<Mutation mutation={SET_USDAFOOD}>
                {(setUSDAFood, {data, loading, error, called}) => {
                  if (!data && !called) {
                    setUSDAFood({variables: {food: removeObjectAttribute(food)('__typename')}})
                    return (loading ? <div className='is-fullwidth'><div className='element is-loading'></div></div> : null)
                  } else {
                    return (<NutritionBox foodDesc={food.desc} foodNutrients={food.nutrients} />)
                  }

                }}
            </Mutation>)
          })
        }  else if (error) {
          <td colSpan='6'><div className='container is-fullwidth has-text-centered'><div className='notification is-danger'>Something Went Wrong!!!</div></div></td>
        } else {
          return (loading ? (<td colSpan='5'><div className='container is-fullwidth has-text-centered'><div className='notification has-background-white element is-loading'></div></div></td>) : null)
        }
      }
    }
  </Query>
  )
}