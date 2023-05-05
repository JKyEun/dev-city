import api from './index';

export const setList = async (id, newTodo) => {
  console.log(process.env.REACT_APP_API_URL);
  try {
    const res = await api.post(`/user/setlist/${id}`, newTodo);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
