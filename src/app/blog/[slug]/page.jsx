import React from 'react';

export default function BlogPost({ params }) {
  const { slug } = params;

  return (
    <div className="container section">
      <h1>Blog Post</h1>
      <p>Slug: {slug}</p>
      {/* Add blog post content here */}
    </div>
  );
}
