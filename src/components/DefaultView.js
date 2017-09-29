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
  state = {
    addPostModalOpen: false,
    editPostModalOpen: false,
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

  openEditPostModal = (id) => {
    this.setState(() => ({ editPostModalOpen: true }))
  }

  closeEditPostModal = (id) => {
    this.setState(() => ({ editPostModalOpen: false }))
  }

  onSort = () => {
    this.props.sortPosts()
  }

  onUpVotePost = (id) => {
    console.log('upVote_id', id)
    this.props.votePost(id, 'upVote')
  }

  onDownVotePost = (id) => {
    console.log('downVote_id', id)
    this.props.votePost(id, 'downVote')
  }

  onDeletePost = (id) => {
    console.log('delete_id', id)
    this.props.deletePost(id)
  }

  render() {
    console.log('props',this.props)
    console.log('state',this.state)
    const { currentCategory, categories, posts, comments, sort } = this.props
    const countComments = { '6ni6ok3ym7mf1p33lnez': 0, '8xf0y6ziyjabvozdd253nd': 2 }

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
            <li key={post.id} className='list-item'>
              <Link to={`/${post.category}/${post.id}`}><h4>{post.title}</h4></Link>
              <div className='vote-edit-delete'>
                <button onClick={()=>this.onUpVotePost(post.id)}><UpVoteIcon /></button>
                {post.voteScore}
                <button onClick={()=>this.onDownVotePost(post.id)}><DownVoteIcon /></button>
                <button onClick={()=>this.openEditPostModal(post.id)}><EditIcon /></button>
                <button onClick={()=>this.onDeletePost(post.id)}><DeleteIcon /></button>
              </div>
              <div className='info'>
                {moment(parseInt(post.timestamp,10)).calendar()}{', '}
                author: {post.author}{', '}
                comment: {`${countComments[post.id]}`}{', '}
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