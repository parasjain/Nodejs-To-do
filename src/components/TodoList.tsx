import React from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TodoList({ todos, onDelete, onToggle }: TodoListProps) {
  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center mb-2 p-2 border rounded bg-white shadow-sm"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mr-2 accent-blue-500"
          />
          <span className={todo.completed ? "line-through text-gray-400" : ""}>
            {todo.text}
          </span>
          <button
            className="ml-auto text-red-500 hover:text-red-700 px-2 py-1"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
