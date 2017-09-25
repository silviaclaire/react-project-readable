import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortPosts, sortComments } from '../actions/sort_actions'

class App extends Component {
  componentDidMount() {
    this.props.sortPosts()
    this.props.sortPosts()
    this.props.sortComments()
    this.props.sortComments()
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
    sortPosts: () => dispatch(sortPosts()),
    sortComments: () => dispatch(sortComments()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
