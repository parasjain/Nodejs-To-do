'use client';

import InputField from "../components/InputField";
import AddButton from "../components/AddButton";
import TodoList from "../components/TodoList";
import React, { useEffect, useState } from "react";

export default function Home() {
  type Todo = { id: number; text: string; completed: boolean };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("todos");
    if (stored) {
      const parsed = JSON.parse(stored);
      setTodos(parsed);
      // Set nextId to max existing id + 1
      const maxId = parsed.reduce(
        (max: number, t: Todo) => (t.id > max ? t.id : max),
        0
      );
      setNextId(maxId + 1);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: nextId, text: input.trim(), completed: false },
    ]);
    setNextId(nextId + 1);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-300 p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded shadow-lg p-6 border border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">TODO App</h1>
        <div className="flex mb-4">
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <AddButton onClick={handleAdd} disabled={!input.trim()}>
            Add
          </AddButton>
        </div>
        <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
      </div>
    </div>
  );
}
