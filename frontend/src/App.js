import "./App.css";
import Auth from "./Auth/Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

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
