import React, {useState, useEffect} from 'react';
import Modal from './Modal';
import Show from './Show';
import '../styles/front.css';
import Cookies from 'js-cookie';
// import {collection, query, orderBy, onSnapshot, updateDoc, doc} from 'firebase/firestore';
// import {fs} from '../firebase';

function Front() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [isCheck, setCheck] = useState(false);
  const [filter, setFilter] = useState(false);

  // useEffect(() => {
  //   const q = query(collection(fs, 'tasks'), orderBy('created', 'desc'));
  //   onSnapshot(q, (QuerySnapshot) => {
  //     setTask(QuerySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       text: doc.text,
  //       isCheck: doc.isCheck,
  //     })))
  //   })
  // })

  const addTask = e => {
    if(!e.text || /^\s*$/.test(e.text)) {
        return
    }

    const newTask = [e, ...task];
    Cookies.set('Task Added', true, {expires: 7})

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

  const editTask = async(taskId, newTask) => {
    if(!newTask.text || /^\s*$/.test(newTask.text)) {
      return;
    }
    
    setTask(prev => prev.map(item => (item.id === taskId ? newTask: item)));

    Cookies.set('Task Edited', true, {expires: 7})

    // const updatetodo = doc(fs, 'tasks', taskId)
    // try{
    //   await updateDoc(updatetodo, {
    //     text: newTask
    //   })
    // } catch(err) {
    //   alert(err)
    // }
  }

  const updateFilter = (e) => {
    setFilter(e.target.value)
    console.log(filter)
  }

  return (
    <div>
      <h2 className="title">To Do List</h2>
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