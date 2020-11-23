import { useContext, useEffect } from "react";
import Head from "next/head";
import { TodoContext } from "../context/todoContext";
import auth0 from "../utils/auth0";
import Navbar from "../components/navbar";
import TodoForm from "../components/addTodoForm";

export default function Home({ data, user }) {
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
    <div>
      <Head>
        <title>Nextjs, Auth0, AirTable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <main>
              <h4 className="mt-3 mb-3">Todo App With Nextjs, Auth0 and Airtable</h4>
            </main>
            {user ? (
              <>
                <TodoForm />
                <ul className="mt-5 list-group">
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
              </>
            ) : (
              <p className="lead">Login To Add / View Todo</p>
            )}
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  // console.log(session)
  const res = await fetch("http://localhost:3000/api/getTodos");
  const data = await res.json();

  return {
    props: {
      data,
      user: session?.user || null,
    },
  };
}
