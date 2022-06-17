import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameInputRef = useRef()
  const addTodoBtn = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos)
      setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameInputRef.current.value
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: prevTodos.reduce((prev, curr) => prev.id <= curr.id ? curr: prev, {id: 0}).id + 1, name: name, completed: false}]
    })
    todoNameInputRef.current.value = null
    todoNameInputRef.current.select();
  }

  function handleClearCompleted() {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  function handleTodoNameKeyInput(e) {
    if (e.key === 'Enter') {
      addTodoBtn.current.click();
    }
  }

  return (
    <div className="app">
      <section className="todo-add">
        <h1 className="add-todo-title">Add Todo</h1>
        <input ref={todoNameInputRef} onKeyUp={handleTodoNameKeyInput} type="text" placeholder="todo..."/>
        <button ref={addTodoBtn} className="add-todo-btn" onClick={handleAddTodo}>+</button>
        <div>
          <button className="clear-todo-btn" onClick={handleClearCompleted}>Clear Completed</button>
        </div>
      </section>
      <section className="todo-list">
        <h1 className="todo-list-title" data-todos-left={todos.filter(todo => !todo.completed).length}>Todo List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </section>
    </div>
  )
}

export default App;
