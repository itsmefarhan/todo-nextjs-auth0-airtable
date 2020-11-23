import Head from "next/head";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossorigin="anonymous"
        />
      </Head>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
