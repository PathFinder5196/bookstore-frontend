import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Book from "./routes/book/Book";
import NotFound from "./components/NotFound";
import AddBook from "./routes/book/AddBook";
import Login from "./components/Login";
import Home from "./components/Home";
import WithAuth from "./components/WithAuth";

axios.interceptors.request.use(
  (config) => {
    const authorizationConfig = config;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.accessToken) {
      authorizationConfig.headers.common["x-access-token"] = user.accessToken;
    }
    return authorizationConfig;
  },
  (error) => Promise.reject(error)
);

function App() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      {/* Admin routes */}
      <Route path="/books" exact component={WithAuth(Book)} />
      <Route path="/books/new" exact component={WithAuth(AddBook)} />
      <Route path="/books/edit/:id" exact component={WithAuth(AddBook)} />
      {/* Not found route */}
      <Route component={NotFound} />
    </Switch>
  );
}
export default App;
