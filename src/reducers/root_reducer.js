import { combineReducers } from 'redux'
import sortReducer from './sort_reducer'
import categoryReducer from './category_reducer'
import postReducer from './post_reducer'
import commentReducer from './comment_reducer'

const rootReducer = combineReducers({
  sort: sortReducer,
  categories: categoryReducer,
  posts: postReducer,
  comments: commentReducer
})

export default rootReducer