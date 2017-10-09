import * as API from '../utils/API'
import { GET_POSTS_BY_CATEGORY, GET_POSTS, ADD_POST, FETCH_POST, VOTE_POST, EDIT_POST, DELETE_POST } from './types'

export const getPostsByCategory = (category) => dispatch => (
  API.getPostsByCategory(category)
  .then(posts => dispatch({
    type: GET_POSTS_BY_CATEGORY,
    posts
  }))
)

export const getPosts = () => dispatch => (
  API.getPosts()
  .then(posts => dispatch({
    type: GET_POSTS,
    posts
  }))
)

export const addPost = (body) => dispatch => (
  API.addPost(body)
  .then(post => dispatch({
    type: ADD_POST,
    post
  }))
)

export const fetchPost = (id) => dispatch => (
  API.fetchPost(id)
  .then(post => dispatch({
    type: FETCH_POST,
    post
  }))
)

export const votePost = (id, option) => dispatch => (
  API.votePost(id, option)
  .then(post => dispatch({
    type: VOTE_POST,
    post
  }))
)

export const editPost = (id, body) => dispatch => (
  API.editPost(id, body)
  .then(post => dispatch({
    type: EDIT_POST,
    post
  }))
)

export const deletePost = (id) => dispatch => (
  API.deletePost(id)
  .then(() => dispatch({
    type: DELETE_POST,
    id
  }))
)