export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'

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