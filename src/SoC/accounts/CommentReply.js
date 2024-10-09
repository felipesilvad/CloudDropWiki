import React, {useState} from 'react';
import Mongo from '../../mango';

const CommentReply = ({setComments, comments, reply, userData, handleReply}) => {
  const [newComment, setNewComment] = useState('');

  const handleAddReply = () => {
    if (newComment.trim()) {
      Mongo.insert("comments", {
        "user": userData.uid,
        "text": newComment,
        "page": window.location.pathname,
        "reply": reply,
      })
      setComments([...comments, {
        "user": userData.uid,
        "text": newComment,
        "page": window.location.pathname,
        "reply": reply,
      }]);
      setNewComment('');
      handleReply()
    }
  };
  return (
    <div className="comment-input">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleAddReply}>Post reply</button>
    </div>
  );
};

export default CommentReply;
