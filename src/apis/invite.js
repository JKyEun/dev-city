import api from './index';

export const getRequest = async (id) => {
  try {
    const res = await api.get(`/invite/get/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const removeRequest = async (id, data) => {
  try {
    const res = await api.get(`/invite/remove/${id}`, data);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const addRequest = async (id, data) => {
  try {
    const res = await api.get(`/invite/add/${id}`, data);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
