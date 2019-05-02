import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ReceiptCalculatorContainer from '../containers/receiptCalculatorContainer'
import pagesList from '../pagesList'

export default class ReceiptCalculatorPage extends React.Component {
  render() {
    const pageMeta = pagesList.receiptCalculator
    return (
      <Layout
        location={this.props.location}
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
      >
        <SEO title={pageMeta.title} keywords={pageMeta.keywords} />
        <ReceiptCalculatorContainer />
      </Layout>
    )
  }
}
