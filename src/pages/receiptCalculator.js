import React from 'react'
import SEO from '../components/seo'
import ReceiptCalculatorContainer from '../containers/ReceiptCalculatorContainer'
import pagesList from '../pagesList'
import TwoRowLayout from '../layouts/TwoRowLayout'
import ReceiptLeftBar from '../containers/ReceiptLeftBar'
import { graphql } from 'gatsby'

export default class ReceiptCalculatorPage extends React.Component {
  render() {
    const { data } = this.props;
    console.log('data', data.allReceiptsJson.edges)
    
    const pageMeta = pagesList.receiptCalculator
    return (
      <React.Fragment>
        <SEO title={pageMeta.title} keywords={pageMeta.keywords} />
        <TwoRowLayout
          location={this.props.location}
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
        >
          <ReceiptLeftBar/>
          <ReceiptCalculatorContainer />
        </TwoRowLayout>
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query {
    allReceiptsJson {
      edges {
        node {
          volume {
            value
            unit
          }
          receipt {
            value
            unit
          }
          name
        }
      }
    }
  }
`
