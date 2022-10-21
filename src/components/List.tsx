import { useState, FormEvent, ChangeEvent, InvalidEvent} from 'react';
import {v4 as uuid } from 'uuid';

import { PlusCircle, } from 'phosphor-react';
import styles from './List.module.css';

import clipboard from '../assets/clipboard.svg';
import Task from './Task';

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

function List() {
  const [tasks, setTasks] = useState([] as ITask[])

  const [newTaskText, setNewTaskText] = useState('')

  const isEmptyTasks = tasks.length === 0;
  const isTextTaskEmpty = newTaskText.trim().length === 0

  const completedTasksCount = tasks.reduce((acc, task) => {
    if (task.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);

  function handleCreateNewTask(event: FormEvent): void {
    event.preventDefault();

    const task = {
      id: uuid(), 
      title: newTaskText,
      completed: false
    }

    setTasks((tasks) => [...tasks, task])
    setNewTaskText('')
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskTextInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function onCheckTask(id: string, checked: boolean): void {
    const changedTasks = tasks.map(
      (task) => {
        if (task.id === id) {
          return {...task, completed: checked }
        }
        return task;
      });

    changedTasks.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1
    })
    
    setTasks(changedTasks)
  }

  function onDeleteTask(id: string): void {
    setTasks((tasks) => tasks.filter((task) => task.id!== id))
  }

  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input 
          required
          placeholder="Adicione uma nova tarefa" 
          type="text" 
          value={newTaskText}
          onChange={handleNewTaskTextChange}
          onInvalid={handleNewTaskTextInvalid}
        />
        <button type="submit" disabled={isTextTaskEmpty}>
          Criar
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>
      <div className={styles.list}>
        <header className={styles.headerList}>
          <div className={styles.headerCountTask}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.headerCountCompletedTask}>
            <strong>Concluidas</strong>
            <span>{completedTasksCount} de {tasks.length}</span>
          </div>
        </header>
        { isEmptyTasks && 
          <div className={styles.emptyState}>
            <img src={clipboard} alt="Estado vázio" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        }
        <main className={styles.content}>
          {
            tasks.map((task) => {
                return (
                  <Task 
                    key={task.id}
                    task={task}
                    onCheckTask={onCheckTask}
                    onDeleteTask={onDeleteTask}
                  />
                )
            })
          }
        </main>
      </div>
    </div>
  )
}

export default List;