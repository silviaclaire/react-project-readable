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

class PostView extends Component {
  state = {
    addPostModalOpen: false,
    addCommentModalOpen: false,
  }

  componentDidMount() {
    this.props.getComments(this.props.currentPostId)
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

  openAddCommentModal = () => {
    this.setState(() => ({ addCommentModalOpen: true }))
    this.props.addComment({
      id: '8tu4bsun805n8un48ve90',
      parentId: this.props.currentPostId,
      timestamp: 1469479767190,
      body: 'Comments. Are. Not. Cool.',
      author: 'thingone'
    })
  }

  closeAddCommentModal = () => {
    this.setState(() => ({ addCommentModalOpen: false }))
  }

  onSort = () => {
    this.props.sortComments()
  }

  render() {
    const { currentPostId, comments, sort } = this.props

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