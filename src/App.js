import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Book from "./routes/book/Book";
import NotFound from "./components/NotFound";
import AddBook from "./routes/book/AddBook";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Book} />
        <Route path="/new" exact component={AddBook} />
        <Route path="/default" render={() => <Redirect to="/" />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
export default App;
