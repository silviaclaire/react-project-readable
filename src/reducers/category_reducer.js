import { GET_CATEGORIES } from '../actions/category_actions'

export default function categoryReducer (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories.map(c => c.name)
    default :
      return state
  }
}