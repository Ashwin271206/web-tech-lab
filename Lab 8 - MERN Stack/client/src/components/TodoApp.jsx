import { Component } from 'react'
import TaskList from './TaskList.jsx'
import TaskForm from './TaskForm.jsx'

const API_BASE = 'http://localhost:5000/api'

// TodoApp - main task-list component.
// State: todos (array of tasks) and newTodo (text of the task being typed).
// Fetches existing tasks on mount, and supports adding, toggling and deleting tasks.
class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodo: '',
      loading: true,
      error: null,
    }
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleToggleTodo = this.handleToggleTodo.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
  }

  // On mount, send a GET request to the server to fetch existing tasks
  componentDidMount() {
    fetch(`${API_BASE}/todos`)
      .then((response) => response.json())
      .then((data) => {
        // Update the todos state with the retrieved data
        this.setState({ todos: data, loading: false })
      })
      .catch((error) => {
        console.error('Error fetching todos:', error)
        this.setState({ error: 'Could not load tasks from the server', loading: false })
      })
  }

  // Create a new task object and send a POST request to add it to the database
  handleAddTodo(taskText) {
    const newTask = { task: taskText, completed: false }

    fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((savedTodo) => {
        // Update state with the newly added task
        this.setState((prevState) => ({
          todos: [...prevState.todos, savedTodo],
        }))
      })
      .catch((error) => {
        console.error('Error adding todo:', error)
      })
  }

  // Toggle a task's completed status
  handleToggleTodo(todo) {
    fetch(`${API_BASE}/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        this.setState((prevState) => ({
          todos: prevState.todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)),
        }))
      })
      .catch((error) => {
        console.error('Error updating todo:', error)
      })
  }

  // Delete a task
  handleDeleteTodo(id) {
    fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' })
      .then(() => {
        this.setState((prevState) => ({
          todos: prevState.todos.filter((t) => t._id !== id),
        }))
      })
      .catch((error) => {
        console.error('Error deleting todo:', error)
      })
  }

  render() {
    const { todos, loading, error } = this.state

    return (
      <section className="todo-app">
        <div className="todo-app__header">
          <h2>My Tasks</h2>
          <p className="todo-app__subtitle">Backed by MongoDB via the Express API</p>
        </div>

        <TaskForm onAddTodo={this.handleAddTodo} />

        {loading && <p className="todo-app__status">Loading tasks…</p>}
        {error && <p className="todo-app__status todo-app__status--error">{error}</p>}

        {!loading && !error && (
          <TaskList todos={todos} onToggle={this.handleToggleTodo} onDelete={this.handleDeleteTodo} />
        )}
      </section>
    )
  }
}

export default TodoApp
