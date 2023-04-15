import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Comment({ commentDB, setBoardDB }) {
  const { id } = useParams();
  const [commentWriterInfo, setCommentWriterInfo] = useState(null);
  const userInfo = useSelector((state) => state.user);
  const date = new Date(commentDB.date);
  const dateFormat =
    date.getFullYear() +
    '. ' +
    (date.getMonth() + 1) +
    '. ' +
    date.getDate() +
    '.';

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
