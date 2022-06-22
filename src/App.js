import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import Button from "./Button";
import Header1 from "./Header1";

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
        <Header1 className="add-todo-title" label="Add Todo" />
        <input ref={todoNameInputRef} onKeyUp={handleTodoNameKeyInput} type="text" placeholder="todo..."/>
        <Button ref={addTodoBtn} className="add-todo-btn" onClick={handleAddTodo} label="+"/>
        <Button className="clear-todo-btn" onClick={handleClearCompleted} label="Clear Completed"/>
      </section>
      <section className="todo-list">
        <Header1 className="todo-list-title" data-todos-left={todos.filter(todo => !todo.completed).length} label="Todo List" />
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </section>
    </div>
  )
}

export default App;
