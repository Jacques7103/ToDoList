import React, {useState} from 'react';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import Modal from './Modal';
import './modal.css'

const Show = ({task, completeTask, removeTask, editTask, filter}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        stat: 'incomplete'
    });

    const submitTask = e => {
        editTask(edit.id, e)
        setEdit({
            id: null,
            value: '',
            stat: 'incomplete'
        })
    }
    
    if(filter === 'incomplete'){
        return task.map((task, index) => (
            task.isCheck === false && (
                <div className={'task-row'} key={index}>
                    <input type='checkbox' key={task.id} onClick={() => completeTask(task.id)} className='checkbox' checked={task.isCheck}/>
                    <div className='txt'>{task.text}</div>
                    <div className='icon'>
                        <RiCloseCircleLine onClick={() => removeTask(task.id)} className='delete'/>
                        <TiEdit onClick={() => {setEdit({id: task.id, value: task.text, stat: task.stat}); setModalOpen(true)}} className='edit'/>
                        <Modal type='update' open={modalOpen} setOpen={setModalOpen} onSubmit={submitTask} task={task} editTask={editTask}></Modal>
                    </div>
                </div>
            )
        ))
    } if(filter === 'completed'){
        return task.map((task, index) => (
            task.isCheck === true && (
                <div className={'task-row'} key={index}>
                    <input type='checkbox' key={task.id} onClick={() => completeTask(task.id)} className='checkbox' checked={task.isCheck}/>
                    <div className='txt'>{task.text}</div>
                    <div className='icon'>
                        <RiCloseCircleLine onClick={() => removeTask(task.id)} className='delete'/>
                        <TiEdit onClick={() => {setEdit({id: task.id, value: task.text, stat: task.stat}); setModalOpen(true)}} className='edit'/>
                        <Modal type='update' open={modalOpen} setOpen={setModalOpen} onSubmit={submitTask} task={task}></Modal>
                    </div>
                </div>
            )
        ))
    } else {
        return task.map((task, index) => (
            <div className={'task-row'} key={index}>
                <input type='checkbox' key={task.id} onClick={() => completeTask(task.id)} className='checkbox' checked={task.isCheck}/>
                <div className='txt'>{task.text}</div>
                <div className='icon'>
                    <RiCloseCircleLine onClick={() => removeTask(task.id)} className='delete'/>
                    <TiEdit onClick={() => {setEdit({id: task.id, value: task.text, stat: task.stat}); setModalOpen(true)}} className='edit'/>
                    <Modal type='update' open={modalOpen} setOpen={setModalOpen} onSubmit={submitTask} task={task}></Modal>
                </div>
            </div>
        ))
    }

    
}

export default Show