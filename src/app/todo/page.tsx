"use state";

import { useState } from "react";

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
      // sharing all ur secrets with each other since we were kids, got the music can u baby tell me y
    }
  });

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl">
      <h1 className="">Your To-do List</h1>
      <div className="">{/* Subjects Slection Function here */}</div>
    </div>
  );
};

export default page;
