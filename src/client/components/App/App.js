import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import AppActions from "./actions";
import LoginPage from "../LoginPage/LoginPage";
import Register from "../Register/Register";
import { withCookies } from "react-cookie";
import Restaurant from "../Restaurant/Restaurant";
import Search from "../Search/Search";
import UserEdit from "../UserEdit/UserEdit";
import Background from "../../../background.png";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUserEventHandler(this.props.cookies.cookies.name);
  }

  render() {
    return (
      <div className="app-root">
        <div>
          <h2 className="ui header">Fast Food Restaurants Reviews</h2>
          <section
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              backgroundRepeat: "yes",
              resizeMode: "stretch"
            }}
          >
            {this.props.loggedIn ? (
              <div>
                <Search
                  currentUser={this.props.username}
                  loggedInUserId={this.props.loggedInUserId}
                  currentLocation={this.props.location}
                />
              </div>
            ) : (
              []
            )}
          </section>
        </div>
        <div className="ui inverted left fixed vertical menu">
          <a className="item">
            <LoginPage
              appUser={this.props.username}
              appLoggedIn={this.props.loggedIn}
              currentLocation={this.props.location}
            />
          </a>
          {this.props.loggedIn ? (
            <a className="item">
              <UserEdit loggedInUserId={this.props.loggedInUserId} />
            </a>
          ) : (
            []
          )}
          <a className="item">
            <Register loggedInUserId={this.props.loggedInUserId} />
          </a>
          <a className="item">
            <Restaurant loggedInUserId={this.props.loggedInUserId} />
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: props.cookies.cookies.name,
    loggedIn:
      props.cookies &&
      props.cookies.cookies.name &&
      props.cookies.cookies.name !== ""
        ? true
        : false,
    location:
      props.cookies.cookies.location &&
      props.cookies.cookies.location !== "undefined" &&
      JSON.parse(props.cookies.cookies.location),
    loggedInUserId:
      props.cookies && props.cookies.cookies.id
        ? JSON.parse(props.cookies.cookies.id)
        : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserEventHandler: name => {
      dispatch(AppActions.loadUserEventHandler(name));
    }
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
