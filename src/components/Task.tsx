import { Check, Trash } from 'phosphor-react';
import { ChangeEvent } from 'react';
import { ITask } from './List';
import styles from './Task.module.css';

interface TaskProps {
  task: ITask;
  onCheckTask: (id: string, checked: boolean) => void;
  onDeleteTask: (id: string) => void;
}

function Task({task, onCheckTask, onDeleteTask}: TaskProps) {
  console.log('Task!', task);

  function handleCheckTask(event: ChangeEvent<HTMLInputElement>) {
    console.log('Clique!', task.id);
    onCheckTask(task.id, event.target.checked);
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
      <div className={styles.task}>
        <input onChange={handleCheckTask} type="checkbox" id={`checkTask${task.id}`}/>
        <label htmlFor={`checkTask${task.id}`}>
          { 
            task.completed && <Check />
          }
        </label>
        <span>
          {task.title}
        </span>
        <button onClick={handleDeleteTask}>
          <Trash size={24} />
        </button>
      </div>
  )
}

export default Task;