import React from 'react'
import './modal.css'

function Check(task, completeTask, isCheck) {
  return (
    <div>
      <input type='checkbox' key={task} onClick={() => completeTask(task)} className='checkbox' checked={isCheck}/>
    </div>
  )
}

export default Check