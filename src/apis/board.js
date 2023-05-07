import api from './index';

export const getBoardDB = async (id) => {
  try {
    const res = await api.get(`/board/get/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const setPost = async (id, newPost) => {
  try {
    const res = await api.post(`/board/add/${id}`, newPost);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const removePost = async (id, post) => {
  try {
    const res = await api.post(`/board/delete/${id}`, post);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async (id, post) => {
  try {
    const res = await api.post(`/board/modify/${id}`, post);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const setComment = async (id, newComment) => {
  try {
    const res = await api.post(`/board/add/comment/${id}`, newComment);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const removeComment = async (id, comment) => {
  try {
    const res = await api.post(`/board/delete/comment/${id}`, comment);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const updateComment = async (id, comment) => {
  try {
    const res = await api.post(`/board/modify/comment/${id}`, comment);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
