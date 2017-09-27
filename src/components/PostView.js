import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories } from '../actions/category_actions'
import { getPostsByCategory, getPosts, addPost, fetchPost, votePost, editPost, deletePost } from '../actions/post_actions'
import { getComments, addComment, fetchComment, voteComment, editComment, deleteComment } from '../actions/comment_actions'
import { sortPosts, sortComments } from '../actions/sort_actions'

class PostView extends Component {
  render() {
    return (
      <div>
        Post View
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, comments, sort }) {
  return {
    categories,
    posts,
    comments,
    sort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    getPosts: () => dispatch(getPosts()),
    addPost: (body) => dispatch(addPost(body)),
    fetchPost: (id) => dispatch(fetchPost(id)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, body) => dispatch(editPost(id, body)),
    deletePost: (id) => dispatch(deletePost(id)),
    getComments: (parentId) => dispatch(getComments(parentId)),
    addComment: (body) => dispatch(addComment(body)),
    fetchComment: (id) => dispatch(fetchComment(id)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
    editComment: (id, body) => dispatch(editComment(id, body)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    sortPosts: () => dispatch(sortPosts()),
    sortComments: () => dispatch(sortComments()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)