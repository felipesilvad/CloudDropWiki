import React, { useState, useEffect } from 'react';
import Mongo from '../../mango';
import CommentItem from './CommentItem';
import CommentAdd from './CommentAdd';

const CommentSection = ({userData}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    Mongo.find('comments',{filter: {"page": window.location.pathname, "deleted": {$ne: true}},})
    .then(res => {
      setComments(res.data.documents)
    }, function(err) {
      console.log(err);
    })
  }, [])

  const handleAddComment = () => {
    if (newComment.trim()) {
      Mongo.insert("comments", {
        "user": userData.uid,
        "text": newComment,
        "page": window.location.pathname,
      })
      setComments([...comments, {
        "user": userData.uid,
        "text": newComment,
        "page": window.location.pathname,
      }]);
      console.log(comments)
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.filter(c => !c.reply).map((comment, index) => (
            <CommentItem comment={comment} index={index} userData={userData}
              comments={comments} setComments={setComments}
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
      {userData?(
        <CommentAdd handleAddComment={handleAddComment} newComment={newComment} setNewComment={setNewComment} />
      ):(
        <div className='d-flex bg-lighter text-uppercase font-italic justify-content-center'>Sign In to Comment</div>
      )}
    </div>
  );
};

export default CommentSection;
