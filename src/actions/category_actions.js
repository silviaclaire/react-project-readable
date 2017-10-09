import * as API from '../utils/API'
import { GET_CATEGORIES } from './types'

export const getCategories = () => dispatch => (
  API.getCategories()
  .then(categories => dispatch({
    type: GET_CATEGORIES,
    categories
  }))
)