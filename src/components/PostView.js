import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, votePost, editPost, deletePost } from '../actions/post_actions'
import { getComments, addComment, fetchComment, voteComment, editComment, deleteComment } from '../actions/comment_actions'
import { sortComments } from '../actions/sort_actions'
import sortBy from 'sort-by'
import moment from 'moment'
import HomeIcon from 'react-icons/lib/fa/home'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'

class PostView extends Component {
  state = {
    addPostModalOpen: false,
    editPostModalOpen: false,
    addCommentModalOpen: false,
    editCommentModalOpen: false,
  }

  componentDidMount() {
    const currentPostId = this.props.match.params.id
    this.props.fetchPost(currentPostId)
    this.props.getComments(currentPostId)
  }

  openAddPostModal = () => {
    this.setState(() => ({ addPostModalOpen: true }))
    this.props.addPost({
      id: '8xf0y6ziyjabvozdd253na',
      timestamp: Date.now(),
      title: 'Learning React is fun!',
      body: 'You hear me.',
      author: 'silviaclaire',
      category: 'udacity',
      voteScore: 10,
      deleted: false
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

  openAddCommentModal = () => {
    this.setState(() => ({ addCommentModalOpen: true }))
    this.props.addComment({
      id: '8tu4bsun805n8un48ve90',
      parentId: this.props.post.id,
      timestamp: 1469479767190,
      body: 'Comments. Are. Not. Cool.',
      author: 'thingone'
    })
  }

  closeAddCommentModal = () => {
    this.setState(() => ({ addCommentModalOpen: false }))
  }

  openEditCommentModal = (id) => {
    this.setState(() => ({ editCommentModalOpen: true }))
  }

  closeEditCommentModal = (id) => {
    this.setState(() => ({ editCommentModalOpen: false }))
  }

  onSort = () => {
    this.props.sortComments()
  }

  onUpVoteComment = (id) => {
    console.log('upVote_id', id)
    this.props.voteComment(id, 'upVote')
  }

  onDownVoteComment = (id) => {
    console.log('downVote_id', id)
    this.props.voteComment(id, 'downVote')
  }

  onDeleteComment = (id) => {
    console.log('delete_id', id)
    this.props.deleteComment(id)
  }

  render() {
    console.log('props', this.props)
    console.log('state',this.state)
    const { post, comments, sort } = this.props

    return (
      <div className='container'>

        <Link to='/'><HomeIcon size={18}/></Link>

        <div className='post-detail'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
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
            comments: {comments.length}{', '}
            category: {post.category}
          </div>
        </div>

        <ul className='list'>
          <div className='comment-header'>
            <h4>Comments ({comments.length})</h4>
          </div>
          <div className='add-sort'>
            <button onClick={()=>this.openAddCommentModal()}>[ + ]</button>
            <button onClick={()=>this.onSort()}>[ Sort by: {sort.comments} ]</button>
          </div>
          {comments.map((comment) => (
            <li key={comment.id} className='list-item'>
              <div className='vote-edit-delete'>
                <button onClick={()=>this.onUpVoteComment(comment.id)}><UpVoteIcon /></button>
                {comment.voteScore}
                <button onClick={()=>this.onDownVoteComment(comment.id)}><DownVoteIcon /></button>
                <button onClick={()=>this.openEditCommentModal(comment.id)}><EditIcon /></button>
                <button onClick={()=>this.onDeleteComment(comment.id)}><DeleteIcon /></button>
              </div>
              <div className='info'>
                {moment(parseInt(comment.timestamp,10)).calendar()}{', '}
                author: {comment.author}{', '}
              </div>
              {comment.body}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments, sort }) {
  const showingComments = comments.sort(sortBy(sort.comments))
  return {
    post: posts,
    comments: showingComments,
    sort: sort
  }
}

function mapDispatchToProps (dispatch) {
  return {
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
    sortComments: () => dispatch(sortComments()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)