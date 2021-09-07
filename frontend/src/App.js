import "./App.css";
import Auth from "./Auth/Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div className="App ">
      <Router>
        <Route exact path="/" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
