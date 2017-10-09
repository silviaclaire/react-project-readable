import { SORT_POSTS, SORT_COMMENTS } from './types'

export function sortPosts() {
  return {
    type: SORT_POSTS,
  }
}

export function sortComments() {
  return {
    type: SORT_COMMENTS,
  }
}