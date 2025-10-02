import React from "react"
import ContentLoader from "react-content-loader"

const ProductsSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={500}
    viewBox="0 0 295 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="147" cy="147" r="147" /> 
    <rect x="51" y="310" rx="10" ry="10" width="190" height="30" /> 
    <rect x="0" y="360" rx="10" ry="10" width="295" height="80" /> 
    <rect x="0" y="460" rx="10" ry="10" width="132" height="40" /> 
    <rect x="160" y="460" rx="10" ry="10" width="132" height="40" />
  </ContentLoader>
)

export default ProductsSkeleton