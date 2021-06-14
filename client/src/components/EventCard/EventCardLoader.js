import React from "react";
const ContentLoaderSvg = () => {
  return (
    <svg
      role="img"
      width="385"
      height="516"
      aria-labelledby="loading-aria"
      viewBox="0 0 385 516"
      preserveAspectRatio="none"
      className="cardEvent"
      style={{maxWidth:"100%"}}
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="-6" rx="2" ry="2" width="400" height="176" />
          <rect x="15" y="187" rx="2" ry="2" width="335" height="37" />
          <rect x="15" y="242" rx="2" ry="2" width="95" height="18" />
          <rect x="143" y="242" rx="2" ry="2" width="95" height="17" />
          <rect x="270" y="242" rx="2" ry="2" width="95" height="16" />
          <rect x="15" y="264" rx="2" ry="2" width="95" height="12" />
          <rect x="143" y="264" rx="2" ry="2" width="95" height="12" />
          <rect x="270" y="264" rx="2" ry="2" width="95" height="12" />
          <rect x="15" y="305" rx="0" ry="0" width="350" height="13" />
          <rect x="15" y="323" rx="0" ry="0" width="350" height="12" />
          <rect x="15" y="340" rx="0" ry="0" width="350" height="13" />
          <rect x="15" y="359" rx="0" ry="0" width="350" height="13" />
          <rect x="232" y="408" rx="14" ry="14" width="100" height="28" />
          <rect x="15" y="408" rx="14" ry="14" width="100" height="28" />
          <rect x="123" y="408" rx="14" ry="14" width="100" height="28" />
          <rect x="15" y="448" rx="14" ry="14" width="100" height="28" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
export default ContentLoaderSvg;