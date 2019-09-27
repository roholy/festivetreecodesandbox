import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import CreateUser from "./components/User";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Board from "./components/Board";
import "./styles.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  loginRouter() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/createuser">createuser</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
          </ul>

          <Route
            path="/login"
            component={() => <Login loginHandler={this.logIn.bind(this)} />}
          />
          <Route path="/user" component={CreateUser} />
          <Route path="/todo" component={Board} />
        </div>
      </Router>
    );
  }

  loggedInRouter() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/Logout">Logout</Link>
            </li>

            <li>
              <Link to="/todo">Todo</Link>
            </li>
          </ul>
          <Route
            path="/Logout"
            component={() => <Logout logoutHandler={this.logOut.bind(this)} />}
          />
          <Route path="/todo" component={Board} />
        </div>
      </Router>
    );
  }

  logIn() {
    this.setState({
      loggedIn: true
    });
  }

  logOut() {
    userService.logOut();
    this.setState({
      loggedIn: false
    });
  }
  render() {
    let menu;

    if (this.state.loggedIn) {
      menu = this.loggedInRouter();
    } else {
      menu = this.loginRouter();
    }

    return <div>{menu}</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
