import React from 'react'
import SEO from '../components/seo'
import ReceiptCalculatorContainer from '../containers/ReceiptCalculatorContainer'
import pagesList from '../pagesList'
import TwoRowLayout from '../layouts/TwoRowLayout'
import ReceiptLeftBar from '../containers/ReceiptLeftBar'

export default class ReceiptCalculatorPage extends React.Component {
  render() {
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
