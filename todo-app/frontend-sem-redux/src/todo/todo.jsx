import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = { description: '', list: [] };

    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    console.log('refresh');
    this.refresh();
  }

  refresh (description = '') {
    const search = description ? `&description__regex=/${description}/` : '';
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => this.setState({ ...this.state, description, list: resp.data }));
  }

  handleRemove (todo) {
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => this.refresh(this.state.description));
  }

  handleMarkAsDone (todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => this.refresh(this.state.description));
  }

  handleMarkAsPending (todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(resp => this.refresh(this.state.description));
  }

  render () {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro' />
        <p>Video: https://www.udemy.com/course/react-redux-pt/learn/lecture/6513272 6:36</p>
        <p>Comandos do backend</p>
        <ul>
          <li>yarn production</li>
          <li>node_modules\.bin\pm2 monit</li>
        </ul>
        <p>Comandos do front</p>
        <ul>
          <li>yarn dev</li>
          <li>http://localhost:8080</li>
        </ul>
        <TodoForm />
        <TodoList
          list={this.state.list}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}
          handleRemove={this.handleRemove} />
      </div>
    );
  }
}
