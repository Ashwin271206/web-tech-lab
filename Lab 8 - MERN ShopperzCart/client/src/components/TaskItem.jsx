// TaskItem component - represents a single task in the list
function TaskItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`task-item ${todo.completed ? 'task-item--completed' : ''}`}>
      <label className="task-item__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <span className="task-item__text">{todo.task}</span>
      </label>
      <button
        className="task-item__delete"
        onClick={() => onDelete(todo._id)}
        aria-label={`Delete task: ${todo.task}`}
      >
        ✕
      </button>
    </li>
  )
}

export default TaskItem
