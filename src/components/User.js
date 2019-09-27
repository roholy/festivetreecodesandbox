import React from "react";
//import ReactDOM from "react-dom";
//import CryptoJS from "crypto-js";
//import Sociallogin from "./SocialLogin";
import { userService } from "../Backend/Backend.js";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", emial: "" };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    // var strongPass = CryptoJS.MD5(this.state.password);

    userService.CreateUser(
      this.state.username,
      this.state.password,
      this.state.email
    );
  }

  render() {
    return (
      <div className="loginBox">
        <form onSubmit={this.handleSubmit}>
          CreateUser: <br />
          <label>
            UserName:
            <input
              id="usernameVal"
              type="text"
              onChange={this.handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              id="passwordVal"
              type="password"
              onChange={this.handlePasswordChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input id="Email" type=" Email" onChange={this.handleEmailChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default CreateUser;
