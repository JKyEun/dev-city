import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Post({ boardDB, el, setBoardDB }) {
  const { id } = useParams();
  const [writerInfo, setWriterInfo] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const date = new Date(el.date);
  const dateFormat =
    date.getFullYear() + '. ' + date.getMonth() + '. ' + date.getDate() + '.';

  const getWriterInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);

      setWriterInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    const deletePost = {
      id: el.id,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/board/delete/${id}`,
        deletePost,
      );
      console.log(res.data);

      const newBoardDB = boardDB.filter((el) => el.id !== deletePost.id);
      setBoardDB(newBoardDB);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWriterInfo(el.writer);
  }, []);

  return (
    <div className="post">
      <div className="postWrap">
        {writerInfo !== null && (
          <>
            <div className="leftSide">
              <img
                src={
                  writerInfo.profileImg
                    ? writerInfo.profileImg
                    : '/images/default-profile.png'
                }
                alt="작성자 프로필 사진"
              />
            </div>
            <div className="rightSide">
              <div className="postInfo">
                <div className="nickname">{writerInfo.nickName}</div>
                <div className="date">{dateFormat}</div>
              </div>
              <div className="content">{el.content}</div>
              <div
                onClick={() => {
                  setIsCommentOpen((cur) => !cur);
                }}
                className="getComment"
              >
                {el.comment.length === 0
                  ? '댓글 달기'
                  : `${el.comment.length}개의 댓글`}
              </div>
              <button className="modifyBtn">수정</button>
              <button onClick={deletePost} className="deleteBtn">
                삭제
              </button>
            </div>
          </>
        )}
      </div>
      {isCommentOpen && (
        <div className="commentWrap">
          {el.comment.map((el) => (
            <Comment key={el.id} commentDB={el} setBoardDB={setBoardDB} />
          ))}
          <form className="commentInput">
            <img src="/images/icon_github.svg" alt="본인 프로필" width="40" />
            <input type="text" placeholder="하고 싶은 말을 적어보세요!" />
            <img
              className="commentBtn"
              src="/images/icon_plus.svg"
              alt="추가"
            />
          </form>
        </div>
      )}
    </div>
  );
}
