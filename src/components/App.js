import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/category_actions'

class App extends Component {
  componentDidMount() {
    this.props.getCategories()
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
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
