import React, {useState} from 'react';
import Modal from './Modal';
import Show from './Show';

function Front() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [isCheck, setCheck] = useState(false);
  const [filter, setFilter] = useState(false);

  const addTask = e => {
    if(!e.text || /^\s*$/.test(e.text)) {
        return
    }

    const newTask = [e, ...task];

    setTask(newTask);
    console.log(newTask)
  }

  const completeTask = e => {
    let updatedTask = task.map(task => {
      if(task.id === e){
        task.isCheck = !task.isCheck
      }
      return task
    })
    setTask(updatedTask);
  }

  const removeTask = e => {
    const removeTasks = [...task].filter(tasks => tasks.id !== e)

    setTask(removeTasks);
  }

  const editTask = (taskId, newTask) => {
    if(!newTask.text || /^\s*$/.test(newTask.text)) {
      return;
    }

    setTask(prev => prev.map(item => (item.id === taskId ? newTask: item)));
  }

  const updateFilter = (e) => {
    setFilter(e.target.value)
    console.log(filter)
  }

  return (
    <div>
        <button className='button2' onClick={() => setOpen(true)}>Add Task</button>
        <select className='selection2' id='stat' value={filter} onChange={updateFilter}>
          <option value='all'>All</option>
          <option value='incomplete'>Incomplete</option>
          <option value='completed'>Completed</option>
        </select>
        <Modal type='add' open={open} setOpen={setOpen} onSubmit={addTask} isCheck={isCheck} setCheck={setCheck}/>
        <div>
          {filter === 'all' ? (<Show task={task} completeTask={completeTask} removeTask={removeTask} editTask={editTask}></Show>) : 
          (<Show task={task} completeTask={completeTask} removeTask={removeTask} editTask={editTask} filter={filter}></Show>)}
        </div>
    </div>
  )
}

export default Front