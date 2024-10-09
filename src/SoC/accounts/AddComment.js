import React, { useState, useEffect } from 'react';

function AddComment() {
  const addTest = () => {
   
  }

  return (
    <div className="comment-input">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={addTest}>Post Comment</button>
    </div>
  )
}

export default AddComment;