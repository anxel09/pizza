import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
  className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="145" cy="125" r="125" /> 
    <rect x="7" y="273" rx="10" ry="10" width="269" height="35" /> 
    <rect x="0" y="337" rx="10" ry="10" width="280" height="79" /> 
    <rect x="0" y="436" rx="10" ry="10" width="98" height="27" /> 
    <rect x="127" y="428" rx="10" ry="10" width="146" height="39" />
  </ContentLoader>
)

export default Skeleton