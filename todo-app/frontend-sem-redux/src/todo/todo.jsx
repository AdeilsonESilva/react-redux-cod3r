import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default () => {
  const [description, setDescription] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => refresh(), []);

  const refresh = (paramDescription = '') => {
    const search = paramDescription ? `&description__regex=/${paramDescription}/` : '';
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => {
        setDescription(paramDescription);
        setList(resp.data);
      });
  };

  const handleSearch = () => {
    refresh(description);
  };

  const handleChange = e => {
    setDescription(e.target.value);
  };

  const handleAdd = () => {
    axios.post(URL, { description })
      .then(resp => refresh());
  };

  const handleRemove = todo => {
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => refresh(description));
  };

  const handleMarkAsDone = todo => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => refresh(description));
  };

  const handleMarkAsPending = todo => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(resp => refresh(description));
  };

  const handleClear = () => {
    refresh();
  };

  return (
    <div>
      <PageHeader name='Tarefas' small='Cadastro' />
      <TodoForm
        description={description}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleClear={handleClear} />
      <TodoList
        list={list}
        handleMarkAsDone={handleMarkAsDone}
        handleMarkAsPending={handleMarkAsPending}
        handleRemove={handleRemove} />
    </div>
  );
};
