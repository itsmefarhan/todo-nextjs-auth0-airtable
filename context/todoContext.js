import { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await fetch("http://localhost:3000/api/getTodos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (title) => {
    const res = await fetch("http://localhost:3000/api/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setTodos((prev) => [data, ...prev]);
  };

  const updateTodo = async (todo) => {
    const res = await fetch("http://localhost:3000/api/updateTodo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    await res.json();
    setTodos((prev) => {
      const existingTodos = [...prev];
      const currentTodo = existingTodos.find((item) => item.id === todo.id);
      currentTodo.fields = todo.fields;
      return existingTodos;
    });
  };

  const deleteTodo = async (id) => {
    const res = await fetch("http://localhost:3000/api/deleteTodo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await res.json();
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <TodoContext.Provider
      value={{ todos, setTodos, getTodos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
