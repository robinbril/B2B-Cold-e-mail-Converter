import React from 'react';

const Loader: React.FC = () => {
  return (
    <svg className="w-16 h-16 text-blue-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeOpacity="0.3"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeDasharray="282.743338823"
        strokeDashoffset="212.057504117"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Loader;
