import React, { Component } from 'react'
import * as API from '../utils/API'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, votePost, editPost, deletePost } from '../actions/post_actions'
import moment from 'moment'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'
import { Modal } from 'react-bootstrap'

class PostContainer extends Component {
  state = {
    editPostModalOpen: false,
    comments: [],
    editPost: {
      title: '',
      body: ''
    }
  }

  componentDidMount() {
    this.props.fetchPost(this.props.postId)
    API.getComments(this.props.postId).then((comments) => this.setState({ comments }))
  }

  openEditPostModal = (oldPost) => {
    this.setState(() => ({
      editPostModalOpen: true,
      editPost: {
        title: oldPost.title,
        body: oldPost.body
      }
    }))
  }

  updateEditPostTitle = (newTitle) => {
    this.setState({
      editPost: {
        title: newTitle
      }
    })
  }

  updateEditPostBody = (newBody) => {
    this.setState({
      editPost: {
        body: newBody
      }
    })
  }

  submitEditPost = (id, newPost) => {
    let post = {
      timestamp: Date.now(),
      title: newPost.title,
      body: newPost.body
    }
    this.props.editPost(id, post)
    this.closeEditPostModal()
  }

  closeEditPostModal = () => {
    this.setState(() => ({ editPostModalOpen: false }))
  }

  onUpVotePost = (id) => {
    this.props.votePost(id, 'upVote')
  }

  onDownVotePost = (id) => {
    this.props.votePost(id, 'downVote')
  }

  onDeletePost = (id) => {
    this.props.deletePost(id)
  }

  render() {
    const { post } = this.props
    const { comments, editPostModalOpen, editPost } = this.state

    return (
      <div>
        {post.deleted === false && (
          <li className='list-item'>
            <Link to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
            <p>{post.body}</p>
            <div className='vote-edit-delete'>
              <button onClick={()=>this.onUpVotePost(post.id)}><UpVoteIcon /></button>
              {post.voteScore}
              <button onClick={()=>this.onDownVotePost(post.id)}><DownVoteIcon /></button>
              <button onClick={()=>this.openEditPostModal(post)}><EditIcon /></button>
              <button onClick={()=>this.onDeletePost(post.id)}><DeleteIcon /></button>
            </div>
            <div className='info'>
              {moment(parseInt(post.timestamp,10)).calendar()}{', '}
              author: {post.author}{', '}
              comments: {comments.length}{', '}
              category: {post.category}
            </div>
          </li>
        )}

        <Modal
          className='static-modal'
          show={editPostModalOpen}
        >
          <Modal.Header>
            <input
              className='input-title'
              type="text"
              value={editPost.title}
              onChange={(e) => this.updateEditPostTitle(e.target.value)}
            />
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={editPost.body}
              onChange={(e) => this.updateEditPostBody(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={()=>this.submitEditPost(post.id, editPost)}>Save</button>
            <button onClick={this.closeEditPostModal}>Close</button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps ({ posts }, { postId }) {
  return {
    post: posts[postId],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, body) => dispatch(editPost(id, body)),
    deletePost: (id) => dispatch(deletePost(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostContainer)