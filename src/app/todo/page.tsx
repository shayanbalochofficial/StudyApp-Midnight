"use state";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleSubjectExpansion = (subject: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.subject]) {
      acc[todo.subject] = [];
    }
    acc[todo.subject].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-linear-to-r  from-purple-400 to-pink-600">
        Your To-do List
      </h1>
      <div className="flex flex-col sm:flex-row mb-6 gap-4">
        <Select
          onValueChange={setSelectedSubject}
          defaultValue={selectedSubject}
        >
          <SelectTrigger className="w-full sm:w-[100px] bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500">
            <SelectValue placeholder="Select Subject"></SelectValue>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
};

export default page;
