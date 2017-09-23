const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': 'token'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
  .then(res => res.json())

export const addPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: option })
  }).then(res => res.json())

export const editPost = (id, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())