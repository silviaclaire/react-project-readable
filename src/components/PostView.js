import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments, addComment } from '../actions/comment_actions'
import { sortComments } from '../actions/sort_actions'
import NavTabs from './NavTabs'
import PostContainer from './PostContainer'
import CommentContainer from './CommentContainer'
import sortBy from 'sort-by'
import _ from 'lodash'
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
    const { currentCategory, currentPostId, comments, sort, history } = this.props
    const { addCommentModalOpen, addComment } = this.state

    return (
      <div className='container'>

        <h1>Readable</h1>

        <NavTabs currentCategory={currentCategory} />

        <div className='post-detail'>
          <PostContainer postId={currentPostId} history={history}/>
        </div>

        <ul className='list'>
          <div className='comment-header'>
            <big>Comments ({comments.length})</big>
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

function mapStateToProps ({ comments, sort }, { match : { params : { category, id }}}) {
  const currentCategory = category
  const currentPostId = id
  const showingComments = _.values(comments).sort(sortBy(sort.comments))
  return {
    currentCategory: currentCategory,
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