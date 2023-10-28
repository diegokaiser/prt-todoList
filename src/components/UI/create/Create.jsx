/* eslint-disable react/prop-types */

import { 
  FaCirclePlus,
  FaCircleXmark,
  FaFloppyDisk
} from 'react-icons/fa6'
import { useState } from 'react'

export function Create({
  editModal,
  activeModal,
  editTodo,
  onSubmitTodo,
  openModal,
  closeModal
}) {
  const [id, setId] = useState('')
  const [text, setText] = useState('')
  const [level, setLevel] = useState('')

  // clear fields
  const handleClear = (e) => {
    e.preventDefault()
    const input = e.target.previousSibling.previousSibling
    input.value = ''
  }

  return (
    <>
      <div className="todo__actions">
        <button
          className="btn-primary"
          onClick={openModal}
        >
          <FaCirclePlus /> Crear TODO
        </button>
      </div>
      <div className={`modal ${activeModal ? 'active' : ''}`}>
        <div className="modal__content">
          {
            editModal ?
            <h4>Edit TODO:</h4> :
            <h4>Create new TODO:</h4>
          }
          <div className="input__field">
            <input 
              type="hidden" 
              name="todoId" 
              id="todoId"
            />
            <input 
              type="text"
              name="todoText"
              id="todoText"
              placeholder="Todo..."
              onChange={(e) => setText(e.target.value)}
            />
            <label htmlFor="todoText">Todo: </label>
            <button
              className='clear'
              onClick={handleClear}
            >
              <FaCircleXmark />
            </button>
          </div>
          <div className="input__field">
            <select 
              name="todoLevel" 
              id="todoLevel"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="0">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="input__field actions">
            <button 
              type="button" 
              className="btn-danger"
              onClick={closeModal}
            >
              <FaCircleXmark />
              Cancel
            </button>
            {
              editModal ?
              <button 
                type="button" 
                className="btn-primary"
                onClick={(e) => editTodo(e, text, level)}
              >
                <FaFloppyDisk />
                Save
              </button> :
              <button 
                type="button" 
                className="btn-success"
                onClick={(e) => onSubmitTodo(e, text, level)}
              >
                <FaFloppyDisk />
                Create
              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}