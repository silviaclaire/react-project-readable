import {
  GET_COMMENTS,
  ADD_COMMENT,
  FETCH_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/comment_actions'
import _ from 'lodash'

export default function commentReducer (state = {}, action) {
  const { comments, comment, id } = action

  switch (action.type) {
    case GET_COMMENTS :
      return _.mapKeys(comments,'id')
    case ADD_COMMENT :
      return {...state, [comment.id]: comment}
    case FETCH_COMMENT :
      return {...state, [comment.id]: comment}
    case VOTE_COMMENT :
      return {...state, [comment.id]: comment}
    case EDIT_COMMENT :
      return {...state, [comment.id]: comment}
    case DELETE_COMMENT :
      return _.omit(state, id)
    default :
      return state
  }
}