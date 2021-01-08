import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Book from "./routes/book/Book";
import NotFound from "./components/NotFound";
import AddBook from "./routes/book/AddBook";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Book} />
      <Route path="/new" exact component={AddBook} />
      <Route path="/default" render={() => <Redirect to="/" />} />
      <Route component={NotFound} />
    </Switch>
  );
}
export default App;
