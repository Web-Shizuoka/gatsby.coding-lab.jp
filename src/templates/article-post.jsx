import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import BlocksRenderer from "../components/blocks-renderer"
import Seo from "../components/seo"

const ArticlePage = ({ data }) => {
  const article = data.strapiArticle

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.cover,
  }

  return (
    <Layout as="article">
      <Seo seo={seo} />
      <header className="">
        <h1 className="">{article.title}</h1>
        <p className="">{article.description}</p>
        <GatsbyImage
          image={getImage(article?.cover?.localFile)}
          alt={article?.cover?.alternativeText}
          className=""
        />
      </header>
      <main className="">
        <BlocksRenderer blocks={article.blocks || []} />
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String) {
    strapiArticle(slug: { eq: $slug }) {
      id
      slug
      title
      description
      blocks {
        ...Blocks
      }
      cover {
        alternativeText
        localFile {
          url
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default ArticlePage