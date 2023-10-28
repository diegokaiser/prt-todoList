/* eslint-disable react/prop-types */

export function Counter({
  totalTodos,
  completedTodos
}) {
  return (
    <div className="todo__counter">
      <div className="counter">
        Completed <strong>{completedTodos}</strong> of <strong>{totalTodos}</strong> tasks.
      </div>
    </div>
  )
}