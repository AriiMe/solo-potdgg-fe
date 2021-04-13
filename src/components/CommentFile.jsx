/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Comment, Avatar } from "antd";

const CommentFile = ({ children, postData }) => {
  return postData.comments.map((comment) => (
    <Comment
      actions={[
        <span key="comment-nested-reply-to"> {comment.user.username}</span>,
      ]}
      author={<a>{comment.user.username}</a>}
      avatar={
        <img
          style={{ borderRadius: "50%", width: "30px", heigth: "30px" }}
          src={comment.user.imgurl}
          alt="userimg"
        />
      }
      content={<p>{comment.text}</p>}
    >
      {children}
    </Comment>
  ));
};

export default CommentFile;
