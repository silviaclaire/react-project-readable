import { GET_CATEGORIES } from '../actions/category_actions'
import _ from 'lodash'

export default function categoryReducer (state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return _.mapKeys(action.categories,'name')
    default :
      return state
  }
}