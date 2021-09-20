import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import store from "./Redux/store";
import { Provider } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./components/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";

function App() {
  return (
    <div className="App ">
      <Provider store={store}>
        <Router>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
