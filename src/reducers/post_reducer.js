import {
  GET_POSTS_BY_CATEGORY,
  GET_POSTS,
  ADD_POST,
  FETCH_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/post_actions'

export default function postReducer (state = [], action) {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY :
      return action.posts
    case GET_POSTS :
      return action.posts
    case ADD_POST :
      return [...state, action.post]
    case FETCH_POST :
      return action.post
    case VOTE_POST :
      return action.post
    case EDIT_POST :
      return action.post
    case DELETE_POST :
      return []
    default :
      return state
  }
}