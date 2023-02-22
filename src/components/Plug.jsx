import React from "react"
import ContentLoader from "react-content-loader"

const Plug = (props) => (
  <ContentLoader 
    speed={2}
    width={350}
    height={125}
    viewBox="0 0 350 125"
    backgroundColor="#284c57"
    foregroundColor="#417168"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="350" height="22" /> 
    <rect x="0" y="30" rx="5" ry="5" width="320" height="22" /> 
    <rect x="0" y="59" rx="5" ry="5" width="250" height="22" /> 
    <rect x="0" y="90" rx="5" ry="5" width="150" height="22" /> 
    <rect x="290" y="90" rx="5" ry="5" width="60" height="25" />
  </ContentLoader>
)

export default Plug

