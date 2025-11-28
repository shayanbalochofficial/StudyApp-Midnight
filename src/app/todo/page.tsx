"use state";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  subject: string;
}

const subjects = [
  "Mathematics",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Business",
  "other",
];

const page = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(subjects);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
          subject: selectedSubject,
        },
      ]);
      setNewTodo("");
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Your To-do List
      </h1>
      <div className="text-4xl font-bold mb-8 text-center ">
        {/* Subjects Selection Function here */}
      </div>
    </div>
  );
};

export default page;
