import api from './index';

export const getChat = async (id) => {
  try {
    const res = await api.get(`/chat/get/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const pushChat = async (id, newChat) => {
  try {
    await api.post(`/chat/push/${id}`, newChat);
  } catch (err) {
    console.error(err);
  }
};
