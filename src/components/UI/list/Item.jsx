/* eslint-disable react/prop-types */

import {
  FaCheck,
  FaTrash,
  FaPencil,
  FaEllipsisVertical,
  FaTriangleExclamation
} from 'react-icons/fa6'

export function Item({
  text,
  level,
  completed,
  createdAt,
  onCompleteTodo,
  onEditTodo,
  onDeleteTodo
}) {
  return (
    <li 
      className={`todo__list-item ${completed ? 'completed' : ''} ${level}`}
    >
      {
        completed ?
        <span>
          <FaCheck />
        </span> :
        <span
          className='c-pointer'
          onClick={onCompleteTodo}
        >
          <FaTriangleExclamation />
        </span>
      }
      <div className="item__content">
        <p>
          {text}
        </p>
        <blockquote>
          Created at: { new Date(createdAt).toDateString() }
        </blockquote>
      </div>
      {
        completed ?
        null :
        <span>
          <FaEllipsisVertical />
          <div className="item">
            <div className="item__menu">
              <div 
                className="item__menu-action"
                onClick={onEditTodo}
              >
                Editar <FaPencil />
              </div>
              <div 
                className="item__menu-action"
                onClick={onDeleteTodo}
              >
                Eliminar <FaTrash />
              </div>
            </div>
          </div>
        </span>
      }
    </li>
  )
}