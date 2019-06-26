import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import pagesList from '../pagesList'
import _ from 'lodash'
import SimpleLayout from '../layouts/SimpleLayout'

export default class IBUCalculatorPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedReceipt: null,
    }
  }
  
  render() {
    const { data } = this.props
    
    const pageMeta = pagesList.ibuCalculator
    const receiptNodes = _.map(data.allReceiptsJson.edges, 'node')
    return (
      <React.Fragment>
        <SEO title={pageMeta.title} keywords={pageMeta.keywords} />
        <SimpleLayout
          location={this.props.location}
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
        >
        </SimpleLayout>
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
