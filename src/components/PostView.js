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
  componentDidMount() {
    const currentPostId = this.props.match.params.id
    this.props.fetchPost(currentPostId)
    this.props.getComments(currentPostId)
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
            <button><UpVoteIcon /></button>
            {post.voteScore}
            <button><DownVoteIcon /></button>
            <button><EditIcon /></button>
            <button><DeleteIcon /></button>
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
            <button>[ + ]</button>
            <button>[ Sort by: {sort.comments} ]</button>
          </div>
          {comments.map((comment) => (
            <li key={comment.id} className='list-item'>
              <div className='vote-edit-delete'>
                <button><UpVoteIcon /></button>
                {comment.voteScore}
                <button><DownVoteIcon /></button>
                <button><EditIcon /></button>
                <button><DeleteIcon /></button>
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