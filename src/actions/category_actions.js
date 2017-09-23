import * as API from '../utils/API'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = () => dispatch => (
  API.getCategories()
  .then(categories => dispatch({
    type: GET_CATEGORIES,
    categories
  }))
)