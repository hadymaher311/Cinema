import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Welcome from "./pages/Welcome";
import Register from "./pages/auth/Register";
import GuestRoute from "./components/GuestRoute";
import AuthUserRoute from "./components/AuthUserRoute";
import Layout from "./components/Layout";
import Movies from "./pages/user/Movies";
import Movie from "./pages/user/Movie";
import Screening from "./pages/user/Screening";

function App() {
  return (
    <Router>
      <Layout>
          <Route exact path="/" component={Welcome} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <AuthUserRoute exact path="/movies" component={Movies} />
          <AuthUserRoute path="/movies/:id" component={Movie} />
          <AuthUserRoute path="/screening/:id" component={Screening} />
      </Layout>
    </Router>
  );
}

export default App;

