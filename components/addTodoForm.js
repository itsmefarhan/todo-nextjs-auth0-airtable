import React, { useState, useContext } from "react";
import { TodoContext } from "../context/todoContext";

const AddTodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <div className="text-center">
        <input type="submit" value="Add" className="btn btn-primary" />
      </div>
    </form>
  );
};

export default AddTodoForm;
