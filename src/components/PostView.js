import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getComments, addComment } from '../actions/comment_actions'
import { sortComments } from '../actions/sort_actions'
import PostContainer from './PostContainer'
import CommentContainer from './CommentContainer'
import sortBy from 'sort-by'
import _ from 'lodash'
import HomeIcon from 'react-icons/lib/fa/home'
import { Modal } from 'react-bootstrap'
import { guid } from '../utils/helpers'

class PostView extends Component {
  state = {
    addCommentModalOpen: false,
    addComment: {
      author: '',
      body: '',
    }
  }

  componentDidMount() {
    this.props.getComments(this.props.currentPostId)
  }

  openAddCommentModal = () => {
    this.setState(() => ({
      addCommentModalOpen: true,
      addComment: {
        author: '',
        body: '',
      }
    }))
  }

  updateAddCommentAuthor = (newAuthor) => {
    this.setState({
      addComment: {
        ...this.state.addComment,
        author: newAuthor
      }
    })
  }

  updateAddCommentBody = (newBody) => {
    this.setState({
      addComment: {
        ...this.state.addComment,
        body: newBody
      }
    })
  }

  submitAddComment = (comment) => {
    const newComment = {
      ...comment,
      id: guid(),
      parentId: this.props.currentPostId,
      timestamp: Date.now()
    }
    this.props.addComment(newComment)
    this.closeAddCommentModal()
  }

  closeAddCommentModal = () => {
    this.setState(() => ({ addCommentModalOpen: false }))
  }

  onSort = () => {
    this.props.sortComments()
  }

  render() {
    const { currentPostId, comments, sort } = this.props
    const { addCommentModalOpen, addComment } = this.state

    return (
      <div className='container'>

        <Link to='/'><HomeIcon size={18}/></Link>

        <div className='post-detail'>
          <PostContainer postId={currentPostId}/>
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
            <CommentContainer key={comment.id} commentId={comment.id}/>
          ))}
        </ul>

        <Modal
          className='static-modal'
          show={addCommentModalOpen}
        >
          <Modal.Header>
            <input
              className='input-title'
              type="text"
              value={addComment.author}
              placeholder='Comment Author'
              onChange={(e) => this.updateAddCommentAuthor(e.target.value)}
            />
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={addComment.body}
              placeholder='Comment Content'
              onChange={(e) => this.updateAddCommentBody(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={()=>this.submitAddComment(addComment)}>Save</button>
            <button onClick={this.closeAddCommentModal}>Close</button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps ({ comments, sort }, { match : { params : { id }}}) {
  const currentPostId = id
  const showingComments = _.values(comments).sort(sortBy(sort.comments))
  return {
    currentPostId: currentPostId,
    comments: showingComments,
    sort: sort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getComments: (parentId) => dispatch(getComments(parentId)),
    addComment: (body) => dispatch(addComment(body)),
    sortComments: () => dispatch(sortComments()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)