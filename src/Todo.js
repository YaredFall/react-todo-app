import React from 'react'

export default function Todo({ todo, toggleTodo }) {

function handleTodoClick() {
    toggleTodo(todo.id)
}

return (
    <li>
        <label className="todo">
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
           <span>{todo.name}</span>
        </label>
    </li>
  )
}
