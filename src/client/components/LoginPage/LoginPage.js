import React from "react";
import { connect } from "react-redux";
import LoginActions from "./actions";
import PropTypes from "prop-types";

class LoginPage extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <form name="loginForm">
          <div>
            <label htmlFor="username">Username</label>
            {this.props.loggedIn ? (
              <h4>Logged in ({this.props.appUser})</h4>
            ) : (
              <input
                type="text"
                className="form-control"
                value={this.props.username}
                onChange={this.props.loginUserSet}
              />
            )}
            {!(username || this.props.loggedIn) && (
              <div className="help-block">Username is required</div>
            )}
          </div>

          <div className="form__submit-btn-wrapper">
            <div>
              {!this.props.loggedIn ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.props.login(this.props.username);
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.props.logout();
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    username: state["login"].get("username"),
    loggedIn: props.appLoggedIn
  };
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(LoginActions.Logout());
    },
    login: username => {
      dispatch(LoginActions.Login(username));
    },
    loginUserSet: username => {
      dispatch(LoginActions.LoginUserSet(username));
    }
  };
};

LoginPage.propTypes = {
  username: PropTypes.string,
  loggedIn: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
