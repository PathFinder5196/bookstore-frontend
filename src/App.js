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
    <Switch>
      {/* Public routes */}
      <Route
        path="/"
        exact
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <Home {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/book/:id"
        exact
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <BookDetails {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/login"
        exact
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <Login {...props} />
          </Suspense>
        )}
      />
      {/* Admin routes */}
      <Route
        path="/books"
        exact
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <Book {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/books/new"
        exact
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <AddBook {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/books/edit/:id"
        exact
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <AddBook {...props} />
          </Suspense>
        )}
      />
      {/* Not found route */}
      <Route
        component={(props) => (
          <Suspense fallback={fallBackComponent}>
            <NotFound {...props} />
          </Suspense>
        )}
      />
    </Switch>
  );
}
export default App;
