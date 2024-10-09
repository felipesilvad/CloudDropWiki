import React, { useState, useEffect } from 'react';
import {firestore} from '../../firebase';
import {onSnapshot, doc} from 'firebase/firestore';
import CommentReply from './CommentReply';
import CommentEdit from './CommentEdit';
import Mongo from '../../mango';

const CommentItem = ({comment,index,setComments,comments,userData}) => {
  const [user, setUser] = useState()
  const [commentTxt, setCommentTxt] = useState(comment.text)

  useEffect(() => {
    if (comment.user) {
      onSnapshot(doc(firestore, "/users/", comment.user), (doc) => {
        setUser(doc.data());
      });
    }
  }, [comment]);

  const [showReply, setShowReply] = useState(false)
  const handleReply = () => {setShowReply(!showReply)}

  const [showEdit, setShowEdit] = useState(false)
  const handleEdit = () => {setShowEdit(!showEdit)}

  const [newComment, setNewComment] = useState(comment.text);

  const handleEditComment = () => {
    if (newComment.trim()) {
      comment.text = newComment
      Mongo.update("comments", comment._id, {"text": newComment})
      handleEdit()
    }
  };

  const handleDeleteComment = () => {
    Mongo.update("comments", comment._id, {"deleted": true})
    setComments(comments.filter(x=>x._id!==comment._id))
  };

  if (comment&&user) {
    return (
      <div key={index} className={`comment-item ${userData&&("pb-1")}`}>
        <div className='d-flex'>
          <img
            src={user.profilePic}
            alt={`${user.username}'s profile`}
            className="profile-pic"
          />
          <div className="comment-details">
            <p className="username">{user.username}</p>
            {showEdit?(
              <CommentEdit 
              newComment={newComment} setNewComment={setNewComment}
              handleEditComment={handleEditComment} 
              setCommentTxt={setCommentTxt} 
              />
            ):(
              <p>{comment.text}</p>
            )}
          </div>
        </div>
        <div className='d-flex justify-content-end'>
          {userData&&(
            <>
              {userData.uid === comment.user&&(
                <b className='reply mx-1 text-danger' onClick={handleDeleteComment}>Delete</b>
              )}
              {userData.uid === comment.user&&(
                <b className='reply mx-1' onClick={handleEdit}>Edit</b>
              )}
              <b className='reply mx-1' onClick={handleReply}>Reply</b>
            </>
          )}
        </div>
        <div className='reply-section'>
            {comments.filter(c => c.reply&&(c.reply===comment._id)).map((comment, index) => (
              <CommentItem comment={comment} index={index} userData={userData}
                comments={comments} setComments={setComments}
              />
            ))}
          {showReply&&(
            <CommentReply reply={comment._id} userData={userData}
              setComments={ setComments} comments={comments} handleReply={handleReply}
            />
          )}
        </div>
      </div>
    );
  };
  }

export default CommentItem;
