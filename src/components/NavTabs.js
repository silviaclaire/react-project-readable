import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/category_actions'
import { capitalize } from '../utils/helpers'
import { Nav, NavItem } from 'react-bootstrap'
import _ from 'lodash'

class NavTabs extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { currentCategory, categories } = this.props

    return (
      <Nav bsStyle='tabs' activeHref={ currentCategory === 'all' ? '/' : `/${currentCategory}`}>
        <NavItem href='/'>All</NavItem>
        {categories.map((category) => (
          <NavItem key={category.path} href={`/${category.path}`}>{capitalize(category.name)}</NavItem>
        ))}
      </Nav>
    )
  }
}

function mapStateToProps ({ categories }, { currentCategory }) {
  return {
    currentCategory: currentCategory,
    categories: _.values(categories),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTabs)