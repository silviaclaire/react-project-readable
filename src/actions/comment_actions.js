import * as API from '../utils/API'
import { GET_COMMENTS, ADD_COMMENT, FETCH_COMMENT, VOTE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './types'

export const getComments = (parentId) => dispatch => (
  API.getComments(parentId)
  .then(comments => dispatch({
    type: GET_COMMENTS,
    comments
  }))
)

export const addComment = (body) => dispatch => (
  API.addComment(body)
  .then(comment => dispatch({
    type: ADD_COMMENT,
    comment
  }))
)

export const fetchComment = (id) => dispatch => (
  API.fetchComment(id)
  .then(comment => dispatch({
    type: FETCH_COMMENT,
    comment
  }))
)

export const voteComment = (id, option) => dispatch => (
  API.voteComment(id, option)
  .then(comment => dispatch({
    type: VOTE_COMMENT,
    comment
  }))
)

export const editComment = (id, body) => dispatch => (
  API.editComment(id, body)
  .then(comment => dispatch({
    type: EDIT_COMMENT,
    comment
  }))
)

export const deleteComment = (id) => dispatch => (
  API.deleteComment(id)
  .then(() => dispatch({
    type: DELETE_COMMENT,
    id
  }))
)