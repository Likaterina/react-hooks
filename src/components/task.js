import React from 'react';

export function Task(props) {
  return (
    <li >
      {!props.task.editingNow ? (<div>
        <input type='checkbox' className="tick" onChange={() => props.check(props.index)} checked={props.task.checked} />
        <label className='simple-label' onDoubleClick={() => props.editTask(props.index)}>{props.task.text}</label>
        <span><a href="#props.task.tagText">{props.task.tagText.join(' ')}</a>
        </span>
        <button className='delete-button' onClick={() => props.deleteTask(props.index)}>x</button>
      </div>) : (<div>
        <form>
          <input type='checkbox' className="tick" onChange={() => props.check(props.index)} checked={props.task.checked} />
          <label className="edit-label" >
            <input className='edit' onChange={props.editingInputTaskChange(props.index)} value={props.task.text} />
          </label>
          <input type='submit' className='finish-edit-button' onClick={() => props.finishEditingTask(props.index)} />
        </form>
        <button className='delete-button' onClick={() => props.deleteTask(props.index)}>x</button>
      </div>
        )
      }
    </li>)
}
