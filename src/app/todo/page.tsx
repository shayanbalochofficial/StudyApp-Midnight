"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
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
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="grow bg-gray-800 border-gray-700 focus:border-purple-500 focus:ring-purple-500 "
        />
        <Button
          onClick={addTodo}
          className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      <AnimatePresence>
        {subjects.map((subject) => {
          const slug = subject.replace(/\s+/g, "-").toLowerCase();
          const buttonId = `subject-${slug}`;
          const panelId = `subject-panel-${slug}`;

          return (
            groupedTodos[subject] &&
            groupedTodos[subject].length > 0 && (
              <motion.div
                key={subject}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="flex items-center w-full text-left cursor-pointer bg-gray-800/30 p-2 rounded-t-lg"
                  aria-expanded={expandedSubjects.includes(subject)}
                  aria-controls={panelId}
                  onClick={() => toggleSubjectExpansion(subject)}
                >
                  {expandedSubjects.includes(subject) ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  <h2 className="text-xl font-semibold">{subject}</h2>
                </button>

                {expandedSubjects.includes(subject) && (
                  <AnimatePresence>
                    <motion.div
                      id={panelId}
                      aria-labelledby={buttonId}
                      className="space-y-2"
                    >
                      {groupedTodos[subject].map((todo) => (
                        <motion.div
                          key={todo.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center bg-gray-800/30 p-4 border-t border-gray-700"
                        >
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo.id)}
                            className="mr-2 border-gray-600"
                          />
                          <span
                            className={`grow ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "text-gray-200"
                            }`}
                          >
                            {todo.text}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTodo(todo.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div> 
                    {/* a vacant wow he meets everyone something stopped u
                    will u grab stupid uhhuhh wow sleep goated ms kang personally i hate ppl like u, it's for his fam, u wud 
                    pubic nothing him he has a reason baasta oki
                    i have never been to grill*/}
                  </AnimatePresence>
                )}
              </motion.div>
            )
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default page;
