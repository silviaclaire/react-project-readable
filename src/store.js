import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import sortReducer from './reducers/sort_reducer'
import categoryReducer from './reducers/category_reducer'
import postReducer from './reducers/post_reducer'
import commentReducer from './reducers/comment_reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  sort: sortReducer,
  categories: categoryReducer,
  posts: postReducer,
  comments: commentReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store