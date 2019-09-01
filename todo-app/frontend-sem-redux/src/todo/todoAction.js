import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = (description, dispatch) => {
  dispatch({
    type: 'DESCRIPTION_CHANGED',
    payload: description
  });
};

export const search = (description, dispatch) => {
  const search = description ? `&description__regex=/${description}/` : '';
  axios.get(`${URL}?sort=-createdAt${search}`)
    .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }));
};

export const add = (description, dispatch) => {
  axios.post(URL, { description })
    .then(resp => dispatch({ type: 'TODO_ADDED', payload: resp.data }))
    .then(() => search(null, dispatch));
};
