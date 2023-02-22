import React from "react"
import ContentLoader from "react-content-loader"

const Plug = (props) => (
  <ContentLoader 
    speed={2}
    width={350}
    height={125}
    viewBox="0 0 350 125"
    backgroundColor="#3a3d40"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="350" height="125" /> 
    <rect x="0" y="210" rx="20" ry="20" width="350" height="100" />
  </ContentLoader>
)

export default Plug

