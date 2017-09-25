import {
  GET_COMMENTS,
  ADD_COMMENT,
  FETCH_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/comment_actions'

export default function commentReducer (state = [], action) {
  switch (action.type) {
    case GET_COMMENTS :
      return action.comments
    case ADD_COMMENT :
      return [...state, action.comment]
    case FETCH_COMMENT :
      return action.comment
    case VOTE_COMMENT :
      return action.comment
    case EDIT_COMMENT :
      return action.comment
    case DELETE_COMMENT :
      return []
    default :
      return state
  }
}