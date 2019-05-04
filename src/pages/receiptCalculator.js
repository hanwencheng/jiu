import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import ReceiptCalculatorContainer from '../containers/ReceiptCalculatorContainer'
import pagesList from '../pagesList'
import TwoRowLayout from '../layouts/TwoRowLayout'
import ReceiptLeftBar from '../containers/ReceiptLeftBar'
import _ from 'lodash'

export default class ReceiptCalculatorPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedReceipt: null,
    }
  }

  selectReceipt(selectedReceipt) {
    this.setState({ selectedReceipt })
  }

  render() {
    const { data } = this.props

    const pageMeta = pagesList.receiptCalculator
    const receiptNodes = _.map(data.allReceiptsJson.edges, 'node')
    return (
      <React.Fragment>
        <SEO title={pageMeta.title} keywords={pageMeta.keywords} />
        <TwoRowLayout
          location={this.props.location}
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
        >
          <ReceiptLeftBar
            list={receiptNodes}
          />
          <ReceiptCalculatorContainer
            list={receiptNodes}
          />
        </TwoRowLayout>
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query {
    allReceiptsJson{
      edges {
        node {
          name,
          elements {
            name
            value
            unit
          },
          volume {
            value
            unit
          },
        }
      }
    }
  }
`
