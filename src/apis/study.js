import api from './index';

export const getStudy = async () => {
  try {
    const res = await api.get('/study/');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const pushLikeList = async (data) => {
  try {
    await api.post('/study/like', data);
  } catch (err) {
    console.error(err);
  }
};

export const createStudy = async (data) => {
  try {
    const res = await api.post('/study/create_study', data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getStudyDetail = async (id) => {
  try {
    const res = await api.get(`/study/detail/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const closeStudy = async (id) => {
  try {
    const res = await api.post(`/study/detail/${id}/close`);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const openStudy = async (id) => {
  try {
    const res = await api.post(`/study/detail/${id}/open`);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const updateStudyInfo = async (id, data) => {
  try {
    await api.put(`/study/update/${id}`, data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteStudyInfo = async (id) => {
  try {
    const res = await api.delete(`/study/delete/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const leaveStudyInfo = async (id, data) => {
  try {
    const res = await api.delete(`/study/leave/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const modifyStudyInfo = async (id, data) => {
  try {
    const res = await api.post(`/study/modify/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const sendSMS = async (data) => {
  try {
    const res = await api.post(`/study/send`, data);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
