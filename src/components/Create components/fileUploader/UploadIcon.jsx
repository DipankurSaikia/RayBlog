import React from 'react';

export function UploadIcon({ className = '' }) {
  return (
    <i 
      className={`ti ti-cloud-upload mb-2 text-7xl text-white max-sm:text-6xl ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
}