import { SORT_POSTS, SORT_COMMENTS } from '../actions/sort_actions'

const sortInitialState = { posts: 'voteScore', comments: 'voteScore' }

export default function sortReducer (state = sortInitialState, action) {
  switch (action.type) {
    default :
      return state
  }
}