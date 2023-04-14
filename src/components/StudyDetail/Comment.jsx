import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Comment({ commentDB, setBoardDB }) {
  const [commentWriterInfo, setCommentWriterInfo] = useState(null);
  const date = new Date(commentDB.date);
  const dateFormat =
    date.getFullYear() + '. ' + date.getMonth() + '. ' + date.getDate() + '.';

  const getWriterInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);

      setCommentWriterInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWriterInfo(commentDB.writer);
  }, []);

  return (
    <>
      {commentWriterInfo !== null && (
        <div className="comment">
          <div>
            <img
              src="/images/icon_github.svg"
              alt="댓글 작성자 프로필"
              width="40"
            />
          </div>
          <div>
            <div className="commentInfo">
              <span>{commentWriterInfo.nickName}</span>
              <span>{dateFormat}</span>
            </div>
            <div className="commentContent">{commentDB.content}</div>
          </div>
          <button className="modifyBtn">수정</button>
          <button className="deleteBtn">삭제</button>
        </div>
      )}
    </>
  );
}
