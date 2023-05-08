import api from './index';

export const getAllUser = async (id) => {
  try {
    const res = await api.get(`/allUser/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
