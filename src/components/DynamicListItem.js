import React from 'react'
import PropTypes from 'prop-types'
import Element from './Element'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DynamicListItem extends React.Component {
  static propTypes = {
    elements: PropTypes.object.isRequired,
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   const isEqual = _.isEqual(nextProps.elements, this.props.elements)
  //   if (isEqual) return false
  //
  //   const hasValueChanged = _.values(this.props.elements).some(element => {
  //     if (!nextProps.elements.hasOwnProperty(element.name)) return false
  //     return element.inValue !== nextProps.elements[element.name].inValue
  //   })
  //   if (!hasValueChanged) return true
  //
  //   const nextKeys = _.keys(nextProps.elements)
  //   const currentKeys = _.keys(this.props.elements)
  //   return !_.isEqual(_.sortBy(nextKeys), _.sortBy(currentKeys))
  // }

  render() {
    const { elements } = this.props
    return (
      <React.Fragment key="list">
        {_.values(elements).map(element => (
          <Element element={element} key={element.name} />
        ))}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  elements: state.receipt.elements,
})

const mapDispatchToProps = _.curry(bindActionCreators)({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicListItem)
