import React, { Component } from 'react'
import * as API from '../utils/API'
import { Link } from 'react-router-dom'
import moment from 'moment'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'
import { Modal } from 'react-bootstrap'

class PostContainer extends Component {
  state = {
    editPostModalOpen: false,
    post: [],
    comments: [],
    editPost: {
      title: '',
      body: ''
    }
  }

  componentDidMount() {
    this.updatePost()
    API.getComments(this.props.postId).then((comments) => this.setState({ comments }))
  }

  updatePost() {
    API.fetchPost(this.props.postId).then((post) => this.setState({ post }))
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
    API.editPost(id, post).then((post) => this.setState({ post }))
    this.closeEditPostModal()
  }

  closeEditPostModal = () => {
    this.setState(() => ({ editPostModalOpen: false }))
  }

  onUpVotePost = (id) => {
    API.votePost(id, 'upVote')
    this.updatePost()
  }

  onDownVotePost = (id) => {
    API.votePost(id, 'downVote')
    this.updatePost()
  }

  onDeletePost = (id) => {
    API.deletePost(id)
    this.updatePost()
  }

  render() {
    const { post, comments, editPostModalOpen, editPost } = this.state

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

export default PostContainer