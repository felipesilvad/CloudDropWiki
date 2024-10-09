import React, {useState} from 'react';
import Mongo from '../../mango';

const CommentEdit = ({newComment, setNewComment, handleEditComment}) => {
  const oldComment = newComment

  console.log(newComment)

  return (
    <div className="comment-input">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleEditComment}>Update</button>
    </div>
  );
};

export default CommentEdit;
