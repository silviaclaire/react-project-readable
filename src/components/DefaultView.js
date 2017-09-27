import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories } from '../actions/category_actions'
import { getPostsByCategory, getPosts, addPost, fetchPost, votePost, editPost, deletePost } from '../actions/post_actions'
import { getComments } from '../actions/comment_actions'
import { sortPosts } from '../actions/sort_actions'
import { capitalize } from '../utils/helpers'
import sortBy from 'sort-by'
import moment from 'moment'
import { Nav, NavItem } from 'react-bootstrap'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'

class DefaultView extends Component {

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  render() {
    console.log('props',this.props)
    console.log('state',this.state)
    const { currentCategory, categories, posts, comments, sort } = this.props

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
            <button>[ + ]</button>
            <button>[ Sort by: {sort.posts} ]</button>
          </div>
          {posts.map((post) => (
            <li key={post.id} className='list-item'>
              <Link to={`/${post.category}/${post.id}`}><h4>{post.title}</h4></Link>
              <div className='vote-edit-delete'>
                <button><UpVoteIcon /></button>
                {post.voteScore}
                <button><DownVoteIcon /></button>
                <button><EditIcon /></button>
                <button><DeleteIcon /></button>
              </div>
              <div className='info'>
                {moment(parseInt(post.timestamp,10)).calendar()}{', '}
                author: {post.author}{', '}
                comment: 0{', '}
                category: {post.category}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, comments, sort }, { match : { params : { category }}}) {
  const currentCategory = category ? category : 'all'
  const showingPosts = posts
    .filter((post) => currentCategory === 'all' ? true : post.category === currentCategory)
    .sort(sortBy(sort.posts))
  return {
    currentCategory: currentCategory,
    categories: categories,
    posts: showingPosts,
    comments: comments,
    sort: sort
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
    sortPosts: () => dispatch(sortPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)