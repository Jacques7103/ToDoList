import React, {useState, useEffect} from 'react';
import './modal.css';
import {MdOutlineClose} from 'react-icons/md';
import uuid from 'react-native-uuid';
// import {fs} from '../firebase';
// import {collection, addDoc, Timestamp} from 'firebase/firestore';

function Modal({type, open, setOpen, onSubmit, task, isCheck, setCheck, editTask}) {
  const [input, setInput] = useState('');
  const [sinput, setSinput] = useState('incomplete')

  useEffect(() => {
    if(type === 'update' && task){
      setInput(task.text);
      setSinput(task.stat);
    } else {
      setInput('');
      setSinput('incomplete')
    }
  }, [type, task, setOpen])

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   try{
  //     if(sinput === 'completed'){
  //       await addDoc(collection(fs, 'tasks'), {
  //         id: uuid.v4(),
  //         text: input,
  //         isCheck: true,
  //         created: Timestamp.now()
  //       }) 
  //     } else {
  //       await addDoc(collection(fs, 'tasks'), {
  //         id: uuid.v4(),
  //         text: input,
  //         isCheck: false,
  //         created: Timestamp.now()
  //         })
  //       }
  //     setInput(''); 
  //     setSinput('incomplete')
  //     setOpen(false) 
  //   } catch (err) {
  //     alert(err)
  //   }
  // }

  const submit = e => {
      e.preventDefault();
      
      if(sinput === 'completed'){
        onSubmit({
          id: uuid.v4(),
          text: input,
          isCheck: true
        });
      } if (sinput === 'incomplete'){
        onSubmit({
          id: uuid.v4(),
          text: input,
          isCheck: false
        });
      }
      
      setInput(''); 
      setSinput('incomplete')
      setOpen(false)

      if(type === 'update'){
        setInput(task.text)
        setSinput(task.stat)
      }
  }

  return (
    open && (
      <div className='wrapper'>
          <div className='container'>
              <div className='closeButton'>
                <MdOutlineClose onClick={() => setOpen(false)}/>
              </div>
              <form className='form' onSubmit={type === 'add' ? submit : editTask}>
                <label>{type === 'update' ? 'Update' : 'Add'} task</label>
                <input type='text' placeholder='Task name' value={input} className='forms' name='text' onChange={(e) => setInput(e.target.value)}></input>
                <div className='label'>
                  <label>Status</label>
                  <select className='selection' id='stat' value={sinput} onChange={(e) => setSinput(e.target.value)}>
                    <option value='incomplete'>Incomplete</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>
                <button className='button'>{type === 'update' ? 'Update' : 'Add'} Task</button>
                <button className='cancel' onClick={() => setOpen(false)}>Cancel</button>
              </form>
          </div>
      </div>
    )
  )
}

export default Modal