import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/category_actions'
import { getPostsByCategory, getPosts, addPost } from '../actions/post_actions'
import { sortPosts } from '../actions/sort_actions'
import PostContainer from './PostContainer'
import { capitalize } from '../utils/helpers'
import sortBy from 'sort-by'
import _ from 'lodash'
import { Nav, NavItem } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { guid } from '../utils/helpers'

class DefaultView extends Component {
  state = {
    addPostModalOpen: false,
    addPost: {
      title: '',
      body: '',
      author: '',
      category: ''
    }
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  openAddPostModal = () => {
    this.setState(() => ({
      addPostModalOpen: true,
      addPost: {
        title: '',
        body: '',
        author: '',
        category: ''
      }
    }))
  }

  updateAddPostTitle = (newTitle) => {
    this.setState({
      addPost: {
        ...this.state.addPost,
        title: newTitle
      }
    })
  }

  updateAddPostBody = (newBody) => {
    this.setState({
      addPost: {
        ...this.state.addPost,
        body: newBody
      }
    })
  }

  updateAddPostAuthor = (newAuthor) => {
    this.setState({
      addPost: {
        ...this.state.addPost,
        author: newAuthor
      }
    })
  }

  updateAddPostCategory = (newCategory) => {
    this.setState({
      addPost: {
        ...this.state.addPost,
        category: newCategory
      }
    })
  }

  submitAddPost = (post) => {
    const newPost = {
      ...post,
      id: guid(),
      timestamp: Date.now()
    }
    this.props.addPost(newPost)
    console.log(newPost)
    this.closeAddPostModal()
  }

  closeAddPostModal = () => {
    this.setState(() => ({ addPostModalOpen: false }))
  }

  onSort = () => {
    this.props.sortPosts()
  }

  render() {
    const { currentCategory, categories, posts, sort } = this.props
    const { addPostModalOpen, addPost } = this.state

    return (
      <div className='container'>

        <h1>Readable</h1>

        <Nav bsStyle='tabs' activeHref={ currentCategory === 'all' ? '/' : `/${currentCategory}`}>
          <NavItem href='/'>All</NavItem>
          {categories.map((category) => (
            <NavItem key={category.path} href={`/${category.path}`}>{capitalize(category.name)}</NavItem>
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

        <Modal
          className='static-modal'
          show={addPostModalOpen}
        >
          <Modal.Header>
            <input
              className='input-title'
              type="text"
              value={addPost.title}
              placeholder='Post Title'
              onChange={(e) => this.updateAddPostTitle(e.target.value)}
            />
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={addPost.author}
              placeholder='Post Author'
              onChange={(e) => this.updateAddPostAuthor(e.target.value)}
            />
            <input
              type="text"
              value={addPost.body}
              placeholder='Post Content'
              onChange={(e) => this.updateAddPostBody(e.target.value)}
            />
            <select onChange={(e) => this.updateAddPostCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.path} value={`${category.path}`}>{capitalize(category.name)}</option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={()=>this.submitAddPost(addPost)}>Save</button>
            <button onClick={this.closeAddPostModal}>Close</button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, sort }, { match : { params : { category }}}) {
  const currentCategory = category ? category : 'all'
  const showingPosts = _.values(posts)
                        .filter((post) => currentCategory === 'all' ? true : post.category === currentCategory)
                        .sort(sortBy(sort.posts))
  return {
    currentCategory: currentCategory,
    categories: _.values(categories),
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