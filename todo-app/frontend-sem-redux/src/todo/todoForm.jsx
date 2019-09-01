import React, { useReducer, useEffect } from 'react';
import todoReducer, { INICIAL_STATE } from '../todo/todoReducer';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { changeDescription, search, add } from './todoAction';

const TodoForm = () => {
  const [state, dispatch] = useReducer(todoReducer, INICIAL_STATE);

  useEffect(() => {
    search(null, dispatch);
  }, []);

  const keyHandler = (e) => {
    if (e.key === 'Enter') {
      e.shiftKey ? search(state.description, dispatch) : add(state.description, dispatch);
    } else if (e.key === 'Escape') {
      changeDescription('', dispatch);
    }
  };

  return (
    <div role='form' className='todoForm'>
      <Grid cols='12 9 10'>
        <input id='description' className='form-control'
          placeholder='Adicione uma tarefa'
          onChange={(event) => changeDescription(event.target.value, dispatch)}
          onKeyUp={keyHandler}
          value={state.description} />
      </Grid>
      <Grid cols='12 3 2'>
        <IconButton style='primary' icon='plus'
          onClick={() => add(state.description, dispatch)} />
        <IconButton style='info' icon='search'
          onClick={() => search(state.description, dispatch)} />
        <IconButton style='default' icon='close'
          onClick={() => changeDescription('', dispatch)} />
      </Grid>
    </div>
  );
};

export default TodoForm;
