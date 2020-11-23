import { useContext, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { TodoContext } from "../context/todoContext";

export default function Home({ data }) {
  const { todos, setTodos, updateTodo, deleteTodo } = useContext(TodoContext);

  useEffect(() => {
    setTodos(data);
  }, []);

  const toggleCompleted = (todo) => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs, Auth0, AirTable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4 className={styles.title}>
          Todo App With Nextjs, Auth0 and Airtable
        </h4>
      </main>
      <ul
        className="mt-5 list-group"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        {todos &&
          todos.map((todo) => (
            <li key={todo.id} className="list-group-item shadow mt-3">
              <input
                type="checkbox"
                name="completed"
                checked={todo.fields.completed}
                onChange={() => toggleCompleted(todo)}
              />
              <span className="ml-3 lead">
                {todo.fields.completed ? (
                  <del>{todo.fields.title}</del>
                ) : (
                  todo.fields.title
                )}
              </span>
              <button
                className="btn-danger btn-sm float-right"
                onClick={() => deleteTodo(todo.id)}
              >
                x
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/getTodos");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
