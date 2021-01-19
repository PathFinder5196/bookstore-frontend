import React, { Suspense } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
const Home = React.lazy(() => import("./components/Home"));
const BookDetails = React.lazy(() => import("./components/Home/BookDetails"));
const Login = React.lazy(() => import("./components/Login"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const AddBook = React.lazy(() => import("./routes/book/AddBook"));
const Book = React.lazy(() => import("./routes/book/Book"));

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

const fallBackComponent = <div>Loading...</div>;

function App() {
  return (
    <Suspense fallback={fallBackComponent}>
      <Switch>
        {/* Public routes */}
        <Route path="/" exact component={Home} />
        <Route path="/book/:id" exact component={BookDetails} />
        <Route path="/login" exact component={Login} />
        {/* Admin routes */}
        <Route path="/books" exact component={Book} />
        <Route path="/books/new" exact component={AddBook} />
        <Route path="/books/edit/:id" exact component={AddBook} />
        {/* Not found route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
export default App;
