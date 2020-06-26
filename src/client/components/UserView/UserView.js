import React from "react";
import { connect } from "react-redux";
import UserViewActions from "./actions";
import ReviewView from "../ReviewView/ReviewView";
import PropTypes from "prop-types";

class UserView extends React.Component {
  render() {
    return (
      <div className="ui centered card">
        {this.props.minify ? (
          <div className="content">
            <div className="header">{this.props.user.username}</div>
            <button
              className="ui button"
              onClick={() => {
                this.props.Unminify(this.props.user.username);
              }}
            >
              Show User Profile
            </button>
          </div>
        ) : (
          <div className="image">
            <img src={this.props.user.picture.data} />
            <div className="content">
              <a className="header">{this.props.user.username}</a>
              <div className="description">
                Location: {this.props.user.location.description}
              </div>
            </div>
            <h6>
              Reviews:{" "}
              {this.props.user.reviews.map((review, index) => (
                <ReviewView
                  review={review}
                  key={index}
                  reviewId={review._id}
                  loggedInUserId={this.props.loggedInUserId}
                />
              ))}
            </h6>
            <button className="ui button" onClick={this.props.Minify}>
              collapse user
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: props.user,
    minify: state["userView"].get("minify"),
    loggedInUserId: props.loggedInUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Unminify: username => {
      dispatch(UserViewActions.Unminify(username));
    },
    Minify: () => {
      dispatch(UserViewActions.Minify());
    }
  };
};

UserView.propTypes = {
  user: PropTypes.object,
  minify: PropTypes.bool,
  loggedInUserId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
