import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={4}
    width={500}
    height={600}
    viewBox="0 0 350 650"
    backgroundColor="#3a3d40"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="350" height="120" />
    <rect x="0" y="125" rx="20" ry="20" width="350" height="120" />
    <rect x="0" y="250" rx="20" ry="20" width="350" height="120" />
    <rect x="0" y="375" rx="20" ry="20" width="350" height="120" />
    <rect x="0" y="500" rx="20" ry="20" width="350" height="120" />
  </ContentLoader>
);

export default Skeleton;
