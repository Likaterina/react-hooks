import React, { useState } from 'react'
import './asslist.css'
import { Task } from './components/task'
import { Tags } from './components/tags'
import { Dropdown } from 'semantic-ui-react'
import '../node_modules/semantic-ui-css/semantic.min.css'

function App() {
  const [todoText, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('all')
  const [extra, setExtra] = useState(false)
  const [todoTag, setTag] = useState('')
  const [tags, setTags] = useState([{ key: 'English', text: 'English', value: 'English' }])
  const [pickedTags, setPickedTags] = useState([])
  const [tagCounter, setTagCounter] = useState(0)

  const handleTaskInput = e => {
    setText(e.target.value)
  }

  const handleTagInput = (e, ) => {
    setTag(e.target.value)
  }

  const handleAddition = (e, { value }) => {
    setTags([...tags, { text: value, key: value, value }])
  }

  const addTag = () => {
    if (todoTag === '') {
      return
    }
    if (tags.find(tag => tag.text == todoTag) != undefined) {
      return
    }

    let tagObject = {
      text: todoTag,
      editingNow: false,
      id: tagCounter,
      key: tagCounter
    }

    console.log()

    setTag('')
    setTags([...tags, tagObject])
    setTagCounter(tagCounter + 1)
  }

  const addTask = () => {
    if (todoText === "") {
      return
    }
    let task = {
      text: todoText,
      editingNow: false,
      checked: false,
      tagText: pickedTags,
      id: tagCounter,
    }

    setText('')
    setTasks([...tasks, task])
    setExtra(true)
    setPickedTags([])

    addTag()

    console.log(task.tagText)
    console.log(extra)
    console.log(todoText)
    console.log(tags)
    console.log(tasks)

  }

  const deleteTask = index => {
    let tasksCopy = tasks.slice()
    tasksCopy.splice(index, 1)
    setTasks(tasksCopy)
  }

  const deleteTag = index => {
    let tagsCopy = tags.slice()
    tagsCopy.splice(index, 1)
    setTags(tagsCopy)
  }

  const editTask = index => {
    let tasksCopy = tasks.slice()
    tasksCopy[index].editingNow = true
    setTasks(tasksCopy)
  }

  const finishEditingTask = index => {
    let tasksCopy = tasks.slice()
    tasksCopy[index].editingNow = false
    setTasks(tasksCopy)
  }

  const editingInputTaskChange = index => {
    return (e) => {
      let tasksCopy = tasks.slice()
      tasksCopy[index].text = e.target.value
      setTasks(tasksCopy)
    }
  }
  const editTag = index => {
    let tagsCopy = tags.slice()
    tagsCopy[index].editingNow = true
    setTags(tagsCopy)
  }

  const finishEditingTag = index => {
    let tagsCopy = tags.slice()
    tagsCopy[index].editingNow = false
    setTags(tagsCopy)
  }

  const editingInputChangeTag = index => {
    return (e) => {
      let tagsCopy = tags.slice()
      tagsCopy[index].text = e.target.value
      setTags(tagsCopy)
    }
  }

  const check = index => {
    let tasksCopy = tasks.slice()
    tasksCopy[index].checked = !tasksCopy[index].checked
    setTasks(tasksCopy)
  }

  const all = () => {
    setStatus('all')
  }

  const active = () => {
    setStatus('active')
  }

  const completed = () => {
    setStatus('completed')
  }

  const filterTask = task => {
    if (status === 'completed') {
      return task.checked
    } if (status === 'active') {
      return !task.checked
    } else {
      return task
    }
  }

  const filterTag = () => {
    if (tags.includes(todoTag)) {
      return
    } else {
      return tags
    }
  }

  const handlePickedTags = (e, { value }) => {
    setPickedTags(value)
  }

  return (
    <section className='all'>
      <header>
        <h1>todos</h1>
      </header>
      <main>
        <div className="input-todo">
          <form>
            <input
              type='text'
              value={todoText}
              onChange={handleTaskInput}
              className='todo-text'
              placeholder="What needs to be done?"
              autoFocus
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addTask()
                }
              }}
            />
            {console.log(todoTag)}
            <Dropdown fluid selection multiple search allowAdditions
              options={tags.map(({ text, key }) => ({ text, key, value: key }))}
              value={pickedTags}
              onAddItem={handleAddition}
              onChange={handlePickedTags}
              placeholder='tags'
            />
            <input type='button' className='add-button' value='add' />
          </form>
        </div>

        <div className='list'>
          <ul className='tasks'> {
            tasks.filter(filterTask).map((task, index) =>
              <Task key={index}
                pickedTags={pickedTags}
                task={task}
                index={index}
                deleteTask={deleteTask}
                editTask={editTask}
                finishEditingTask={finishEditingTask}
                check={check}
                editingInputTaskChange={editingInputTaskChange}
                deleteTag={deleteTag} />
            )
          }
          </ul>
        </div>

        {extra && <section className="footer" >
          <div className="extra">
            <button onClick={all} className="extra-button">All</button>
            <button onClick={active} className="extra-button">Active</button>
            <button onClick={completed} className="extra-button">Completed</button>
          </div>
        </section>}
        <div>
          {console.log(tags)}
          <Tags
            tags={tags}
            handleTagInput={handleTagInput}
            todoTag={todoTag}
            deleteTag={deleteTag}
            editTag={editTag}
            finishEditingTag={finishEditingTag}
            editingInputChangeTag={editingInputChangeTag}
            addTag={addTag}
            tagCounter={tagCounter}
            filterTag={filterTag}
          />

        </div>

      </main>
    </section>
  )

}
export default App;