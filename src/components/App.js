import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostsByCategory, getPosts, addPost, fetchPost, votePost, editPost, deletePost } from '../actions/post_actions'

class App extends Component {
  componentDidMount() {
    this.props.getPostsByCategory('redux')
    this.props.getPosts()
    this.props.addPost({
      id: '8xf0y6ziyjabvozdd253na',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'redux',
      voteScore: 6,
      deleted: false
    })
    this.props.fetchPost('8xf0y6ziyjabvozdd253na')
    this.props.votePost('8xf0y6ziyjabvozdd253na', 'upVote')
    this.props.editPost('8xf0y6ziyjabvozdd253na', {
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.'
    })
    this.props.deletePost('8xf0y6ziyjabvozdd253na')
  }
  render() {
    return (
      <div>
        Hello World
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
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    getPosts: () => dispatch(getPosts()),
    addPost: (body) => dispatch(addPost(body)),
    fetchPost: (id) => dispatch(fetchPost(id)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, body) => dispatch(editPost(id, body)),
    deletePost: (id) => dispatch(deletePost(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
