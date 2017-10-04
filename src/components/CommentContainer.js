import React, { Component } from 'react'
import * as API from '../utils/API'
import moment from 'moment'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'
import { Modal } from 'react-bootstrap'

class CommentContainer extends Component {
  state = {
    editCommentModalOpen: false,
    comment: [],
    editComment: {
      body: ''
    }
  }

  componentDidMount() {
    API.fetchComment(this.props.commentId).then((comment) => this.setState({ comment }))
  }

  openEditCommentModal = (oldComment) => {
    this.setState(() => ({
      editCommentModalOpen: true,
      editComment: {
        body: oldComment.body
      }
    }))
  }

  updateEditComment = (newBody) => {
    this.setState({
      editComment: {
        body: newBody
      }
    })
  }

  submitEditComment = (id, newComment) => {
    let comment = {
      timestamp: Date.now(),
      body: newComment.body
    }
    API.editComment(id, comment).then((comment) => this.setState({ comment }))
    this.closeEditCommentModal()
  }

  closeEditCommentModal = () => {
    this.setState(() => ({ editCommentModalOpen: false }))
  }

  onUpVoteComment = (id) => {
    API.voteComment(id, 'upVote').then((comment) => this.setState({ comment }))
  }

  onDownVoteComment = (id) => {
    API.voteComment(id, 'downVote').then((comment) => this.setState({ comment }))
  }

  onDeleteComment = (id) => {
    API.deleteComment(id).then(this.setState({ comment: [] }))
  }

  render() {
    const { comment, editCommentModalOpen, editComment } = this.state

    return (
      <div>
        {comment.deleted === false && (
          <li className='list-item'>
            <div className='vote-edit-delete'>
              <button onClick={()=>this.onUpVoteComment(comment.id)}><UpVoteIcon /></button>
              {comment.voteScore}
              <button onClick={()=>this.onDownVoteComment(comment.id)}><DownVoteIcon /></button>
              <button onClick={()=>this.openEditCommentModal(comment)}><EditIcon /></button>
              <button onClick={()=>this.onDeleteComment(comment.id)}><DeleteIcon /></button>
            </div>
            <div className='info'>
              {moment(parseInt(comment.timestamp,10)).calendar()}{', '}
              author: {comment.author}
            </div>
            {comment.body}
          </li>
        )}

        <Modal
          className='static-modal'
          show={editCommentModalOpen}
        >
          <Modal.Body>
            <input
              className='input-body'
              type="text"
              value={editComment.body}
              onChange={(e) => this.updateEditComment(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={()=>this.submitEditComment(comment.id, editComment)}>Save</button>
            <button onClick={this.closeEditCommentModal}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default CommentContainer