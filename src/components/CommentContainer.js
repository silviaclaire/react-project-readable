import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComment, voteComment, editComment, deleteComment } from '../actions/comment_actions'
import moment from 'moment'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'
import { Modal } from 'react-bootstrap'

class CommentContainer extends Component {
  state = {
    editCommentModalOpen: false,
    editComment: {
      body: ''
    }
  }

  componentDidMount() {
    this.props.fetchComment(this.props.commentId)
  }

  openEditCommentModal = (comment) => {
    this.setState(() => ({
      editCommentModalOpen: true,
      editComment: {
        body: comment.body
      }
    }))
  }

  updateEditComment = (newBody) => {
    this.setState({
      editComment: {
        ...this.state.editComment,
        body: newBody
      }
    })
  }

  submitEditComment = (id, comment) => {
    const newComment = {
      ...comment,
      timestamp: Date.now()
    }
    this.props.editComment(id, newComment)
    this.closeEditCommentModal()
  }

  closeEditCommentModal = () => {
    this.setState(() => ({ editCommentModalOpen: false }))
  }

  onUpVoteComment = (id) => {
    this.props.voteComment(id, 'upVote')
  }

  onDownVoteComment = (id) => {
    this.props.voteComment(id, 'downVote')
  }

  onDeleteComment = (id) => {
    this.props.deleteComment(id)
  }

  render() {
    const { comment } = this.props
    const { editCommentModalOpen, editComment } = this.state

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

function mapStateToProps ({ comments }, { commentId }) {
  return {
    comment: comments[commentId],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComment: (id) => dispatch(fetchComment(id)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
    editComment: (id, body) => dispatch(editComment(id, body)),
    deleteComment: (id) => dispatch(deleteComment(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)