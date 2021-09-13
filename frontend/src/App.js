import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App ">
      <Router>
        <Route exact path="/" component={Auth} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
