import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={600}
    viewBox="0 0 500 600"
    backgroundColor="#3a3d40"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="-1" rx="20" ry="20" width="350" height="100" />
    <rect x="0" y="105" rx="20" ry="20" width="350" height="100" />
    <rect x="0" y="210" rx="20" ry="20" width="350" height="100" />
    <rect x="0" y="315" rx="20" ry="20" width="350" height="100" />
    <rect x="0" y="420" rx="20" ry="20" width="350" height="100" />
  </ContentLoader>
);

export default Skeleton;
