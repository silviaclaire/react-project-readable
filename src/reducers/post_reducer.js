import {
  GET_POSTS,
  ADD_POST,
  FETCH_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/post_actions'
import _ from 'lodash'

export default function postReducer (state = {}, action) {
  const { posts, post, id }=  action

  switch (action.type) {
    case GET_POSTS :
      return _.mapKeys(posts, 'id')
    case ADD_POST :
      return {...state, [post.id]: post}
    case FETCH_POST :
      return {...state, [post.id]: post}
    case VOTE_POST :
      return {...state, [post.id]: post}
    case EDIT_POST :
      return {...state, [post.id]: post}
    case DELETE_POST :
      return _.omit(state, id)
    default :
      return state
  }
}