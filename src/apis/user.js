import api from './index';

export const getUser = async (id) => {
  try {
    const res = await api.get(`/user/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const setTodoList = async (id, newTodo) => {
  try {
    const res = await api.post(`/user/setlist/${id}`, newTodo);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodoList = async (id, todo) => {
  try {
    const res = await api.post(`/user/deletelist/${id}`, todo);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const updateTodoList = async (id, updatedTodo) => {
  try {
    const res = await api.post(`/user/deletelist/${id}`, updatedTodo);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const signUp = async (account) => {
  try {
    const res = await api.post(`/user/signup`, account);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (account) => {
  try {
    const res = await api.post(`/user/signin`, account);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const kakaoLogin = async (account) => {
  try {
    const res = await api.post(`/user/kakaologin`, account);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const githubLogin = async (account) => {
  try {
    const res = await api.post(`/user/githublogin`, account);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const githubLoginFetch = async (code) => {
  try {
    const res = await api.post(`/user/githublogin/fetch`, code);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const updateUserInfo = async (id, newInfo) => {
  try {
    const res = await api.post(`/user/updateuser/${id}`, newInfo);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const updateUserImg = async (id, formData) => {
  try {
    const res = await api.post(`/user/updateuser/images/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {}
};

export const joinStudy = async (id) => {
  try {
    const res = await api.post(`/user/joinstudy`, id);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
