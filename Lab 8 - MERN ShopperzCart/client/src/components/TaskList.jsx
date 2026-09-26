import TaskItem from './TaskItem.jsx'

// TaskList component - maps through the todos array and renders a TaskItem for each
function TaskList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="task-list__empty">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="task-list">
      {todos.map((todo) => (
        <TaskItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TaskList
