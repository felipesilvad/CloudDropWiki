import React, { useState, useEffect } from 'react';

const CommentAdd = ({handleAddComment,setNewComment,newComment,reply}) => {

  return (
    <div className="comment-input">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={() => handleAddComment(reply)}>Post Comment</button>
    </div>
  );
};

export default CommentAdd;
