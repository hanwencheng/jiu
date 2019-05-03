import React from 'react'
import { Box, Heading } from 'rebass'
import { Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import SimpleLayout from '../layouts/SimpleLayout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import pagesList from '../pagesList'

const PostItem = styled(Box)`
  & ~ & {
    margin-top: 50px;
  }
`

const PostTitle = styled(Heading)`
  margin-top: ${rhythm(1 / 4)};
  margin-bottom: ${rhythm(1 / 4)};
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    const pageMeta = pagesList.index

    return (
      <SimpleLayout
        location={this.props.location}
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
      >
        <SEO title={pageMeta.title} keywords={pageMeta.keywords} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostItem key={node.fields.slug}>
              <PostTitle fontSize={5}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </PostTitle>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </PostItem>
          )
        })}
      </SimpleLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
