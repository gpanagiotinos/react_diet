import gql from 'graphql-tag'

// Queries
export const GET_USDADATA = gql`query getUSDAData($text: String!, $foodGroup: String!, $offset: Int!, $max: Int!) {getUSDAData(text: $text, foodGroup: $foodGroup, offset: $offset, max: $max)
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
export const GET_USDANUTRITION = gql`query getUSDANutritionData($ndbno: String!) {getUSDANutritionData(ndbno: $ndbno)
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
export const GET_USDALISTDATA = gql`query getUSDAListData($lt: String!, $max: Int!, $offset: Int!, $sort: String!, $format: String!)
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
export const GET_USDASEARCHLIST = gql`query getUSDAData($text: String!, $foodGroup: String!, $offset: Int!, $max: Int!) {getUSDAData(text: $text, foodGroup: $foodGroup, offset: $offset, max: $max)
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

export const GET_LOCALFOODDATA = gql `query getLocalFoodData{getLocalFoodData
  {
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
}`

// Mutations
export const SET_USDAFOOD = gql`
  mutation setUSDAFood($food: USDAFoodInput!){
    setUSDAFood(food: $food) {
      desc {
        ndbno
        name
      }
    }
  }`