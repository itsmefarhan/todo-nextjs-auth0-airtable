import "../styles/globals.css";
import Layout from "../components/layout";
import TodoProvider from "../context/todoContext";

function MyApp({ Component, pageProps }) {
  return (
    <TodoProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TodoProvider>
  );
}

export default MyApp;
