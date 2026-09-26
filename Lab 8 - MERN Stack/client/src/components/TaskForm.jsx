import { Component } from 'react'

// TaskForm component - input field + button to add a new task
// Implemented as a class component with handleInputChange and handleSubmit methods
class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Update newTodo state as the user types
  handleInputChange(event) {
    this.setState({ newTodo: event.target.value })
  }

  // Check if input is empty; if not, hand the new task up to the parent and reset the field
  handleSubmit(event) {
    event.preventDefault()
    const text = this.state.newTodo.trim()
    if (text === '') {
      return
    }
    this.props.onAddTodo(text)
    this.setState({ newTodo: '' })
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="task-form__input"
          placeholder="Add a new task…"
          value={this.state.newTodo}
          onChange={this.handleInputChange}
          aria-label="New task"
        />
        <button type="submit" className="task-form__button">
          Add Task
        </button>
      </form>
    )
  }
}

export default TaskForm
