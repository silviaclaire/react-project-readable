import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/category_actions'
import { getPostsByCategory, getPosts, addPost } from '../actions/post_actions'
import { sortPosts } from '../actions/sort_actions'
import PostContainer from './PostContainer'
import { capitalize } from '../utils/helpers'
import sortBy from 'sort-by'
import { Nav, NavItem } from 'react-bootstrap'

class DefaultView extends Component {
  state = {
    addPostModalOpen: false,
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  openAddPostModal = () => {
    this.setState(() => ({ addPostModalOpen: true }))
    this.props.addPost({
      id: '8xf0y6ziyjabvozdd253na',
      timestamp: Date.now(),
      title: 'Learning React is fun!',
      body: 'You hear me.',
      author: 'silviaclaire',
      category: 'udacity'
    })
  }

  closeAddPostModal = () => {
    this.setState(() => ({ addPostModalOpen: false }))
  }

  onSort = () => {
    this.props.sortPosts()
  }

  render() {
    const { currentCategory, categories, posts, sort } = this.props

    return (
      <div className='container'>

        <h1>Readable</h1>

        <Nav bsStyle='tabs' activeHref={ currentCategory === 'all' ? '/' : `/${currentCategory}`}>
          <NavItem href='/'>All</NavItem>
          {categories.map((category) => (
            <NavItem key={category} href={`/${category}`}>{capitalize(category)}</NavItem>
          ))}
        </Nav>

        <ul className='list'>
          <div className='add-sort'>
            <button onClick={()=>this.openAddPostModal()}>[ + ]</button>
            <button onClick={()=>this.onSort()}>[ Sort by: {sort.posts} ]</button>
          </div>
          {posts.map((post) => (
            <PostContainer key={post.id} postId={post.id}/>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, sort }, { match : { params : { category }}}) {
  const currentCategory = category ? category : 'all'
  const showingPosts = posts
    .filter((post) => currentCategory === 'all' ? true : post.category === currentCategory)
    .sort(sortBy(sort.posts))
  return {
    currentCategory: currentCategory,
    categories: categories,
    posts: showingPosts,
    sort: sort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    getPosts: () => dispatch(getPosts()),
    addPost: (body) => dispatch(addPost(body)),
    sortPosts: () => dispatch(sortPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)