import { SORT_POSTS, SORT_COMMENTS } from '../actions/sort_actions'

const sortInitialState = { posts: '-voteScore', comments: '-voteScore' }

export default function sortReducer (state = sortInitialState, action) {
  switch (action.type) {
    case SORT_POSTS :
      const newSortPosts =
        state.posts === '-voteScore' ? '-timestamp' : '-voteScore'
      return { posts: newSortPosts, comments: state.comments }
    case SORT_COMMENTS :
      const newSortComments =
        state.comments === '-voteScore' ? '-timestamp' : '-voteScore'
      return { posts: state.posts, comments: newSortComments }
    default :
      return state
  }
}