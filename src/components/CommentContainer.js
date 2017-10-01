import React, { Component } from 'react'
import * as API from '../utils/API'
import moment from 'moment'
import EditIcon from 'react-icons/lib/fa/pencil'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import UpVoteIcon from 'react-icons/lib/fa/caret-up'
import DownVoteIcon from 'react-icons/lib/fa/caret-down'

class CommentContainer extends Component {
  state = {
    editCommentModalOpen: false,
    comment: []
  }

  componentDidMount() {
    this.updateComment()
  }

  updateComment() {
    API.fetchComment(this.props.commentId).then((comment) => this.setState({ comment }))
  }

  openEditCommentModal = (id) => {
    this.setState(() => ({ editCommentModalOpen: true }))
  }

  closeEditCommentModal = () => {
    this.setState(() => ({ editCommentModalOpen: false }))
  }

  onUpVoteComment = (id) => {
    API.voteComment(id, 'upVote')
    this.updateComment()
  }

  onDownVoteComment = (id) => {
    API.voteComment(id, 'downVote')
    this.updateComment()
  }

  onDeleteComment = (id) => {
    API.deleteComment(id)
    this.updateComment()
  }

  render() {
    const { comment } = this.state

    return (
      <div>
        {comment.deleted === false && (
          <li className='list-item'>
            <div className='vote-edit-delete'>
              <button onClick={()=>this.onUpVoteComment(comment.id)}><UpVoteIcon /></button>
              {comment.voteScore}
              <button onClick={()=>this.onDownVoteComment(comment.id)}><DownVoteIcon /></button>
              <button onClick={()=>this.openEditCommentModal(comment.id)}><EditIcon /></button>
              <button onClick={()=>this.onDeleteComment(comment.id)}><DeleteIcon /></button>
            </div>
            <div className='info'>
              {moment(parseInt(comment.timestamp,10)).calendar()}{', '}
              author: {comment.author}
            </div>
            {comment.body}
          </li>
        )}
      </div>
    )
  }
}

export default CommentContainer