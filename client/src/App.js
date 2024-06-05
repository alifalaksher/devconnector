import { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components Export

import { Landing } from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

//Store Export
import store from "./store";

//Auth for Login and Register.

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
//CSS File Import
import "./App.css";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExp from "./components/profile-forms/AddExp";
import AddEd from "./components/profile-forms/AddEd";
import Profiles from "./components/profiles/Profiles";
import ProfileByID from "./components/profile/ProfileByID";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    // dispatch the thunk action to load the user's data when the app loads
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" Component={Landing} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/login" Component={Login} />
              <Route exact path="/register" Component={Register} />
              <Route exact path="/profile/:id" Component={ProfileByID} />
              <Route exact path="/profiles" Component={Profiles} />
              <Route
                path="dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path="create-profile"
                element={<PrivateRoute component={CreateProfile} />}
              />
              <Route
                path="edit-profile"
                element={<PrivateRoute component={EditProfile} />}
              />
              <Route
                path="add-experience"
                element={<PrivateRoute component={AddExp} />}
              />
              <Route
                path="add-education"
                element={<PrivateRoute component={AddEd} />}
              />
               <Route
                path="posts"
                element={<PrivateRoute component={Posts} />}
              />
               <Route
                path="posts/:id"
                element={<PrivateRoute component={Post} />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
