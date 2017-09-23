import * as API from '../utils/API'

export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const FETCH_POST = 'FETCH_POST'
export const VOTE_POST ='VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

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