import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const ProductTemplate = ({ data: { contentfulProduct }, location }) => {
  return (
    <Layout>
      <div
        style={{ 
          marginLeft: "0 auto",
          width: "100%",
          textAlign: "center"
        }}
      >
        {/* Product Info */}
        <div>
          <h2 style={{ display: "inline-block" }}>
            {contentfulProduct.name} -
          </h2>
          <span style={{ display: "inline-block", color: "#ccc", marginLeft: "4px" }}>
            Added on {contentfulProduct.createdAt}
          </span>
        </div>
        <h4>${contentfulProduct.price}</h4>
        <p>{contentfulProduct.description}</p>
        <button 
          className="snipcart-add-item"
          data-item-id={contentfulProduct.slug}
          data-item-price={contentfulProduct.price}
          data-item-image={contentfulProduct.image.file.url}
          data-item-name={contentfulProduct.name}
          data-item-url={location.pathname}
          style={{ 
            marginBottom: "2rem", 
            background: "darkorange",
            color: "white",
            padding: "0.3em",
            cursor: "pointer",
            borderRadius: "5px"
          }}
      >
        Add to Cart
        </button>
        <Img
          style={{ margin: "0 auto", maxWidth: '600px' }}
          fluid={contentfulProduct.image.fluid} 
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      price
      slug
      description
      createdAt(formatString: "MMMM Do, YYYY h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`

export default ProductTemplate;