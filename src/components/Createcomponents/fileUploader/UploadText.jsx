import React from 'react';

export function UploadText({ text, className = '' }) {
  return (
    <div className={className}>
      {text}
    </div>
  );
}