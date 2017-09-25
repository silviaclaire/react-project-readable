import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments, addComment, fetchComment, voteComment, editComment, deleteComment } from '../actions/comment_actions'

class App extends Component {
  componentDidMount() {
    this.props.getComments('8xf0y6ziyjabvozdd253nd')
    this.props.addComment({
      id: '8tu4bsun805n8un48ve90',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Comments. Are. Not. Cool.',
      author: 'thingone'
    }) //
    this.props.fetchComment('8tu4bsun805n8un48ve90')
    this.props.voteComment('8tu4bsun805n8un48ve90', 'upVote')
    this.props.editComment('8tu4bsun805n8un48ve90', {
      timestamp: 1468166872634,
      body: 'I am not a comment.'
    }) //
    this.props.deleteComment('8tu4bsun805n8un48ve90')
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
    getComments: (parentId) => dispatch(getComments(parentId)),
    addComment: (body) => dispatch(addComment(body)),
    fetchComment: (id) => dispatch(fetchComment(id)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
    editComment: (id) => dispatch(editComment(id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
