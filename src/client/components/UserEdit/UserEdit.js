import React from "react";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";
import UserEditActions from "../UserEdit/actions";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";
import UserView from "../UserView/UserView";

class UserEdit extends React.Component {
  handleImage = event => {
    const fileReader = new FileReader();
    const pic = event.target.files[0];

    fileReader.onloadend = () => {
      this.props.userEditPictureSet(fileReader.result, pic.name);
    };
    fileReader.readAsDataURL(pic);
  };

  render() {
    return (
      <div>
        <Button onClick={this.props.modalIsOpened}>Edit Profile</Button>

        <Modal
          size="tiny"
          open={this.props.open}
          onClose={this.props.modalIsClosed}
        >
          <Modal.Header>View Your Profile</Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              <h2>Edit Profile Details</h2>
              <form
                className="ui form"
                onSubmit={() =>
                  this.props.userEditRequest(
                    this.props.username,
                    this.props.location,
                    this.props.currentUser
                  )
                }
              >
                <input
                  className="field "
                  type="text"
                  id="username"
                  value={this.props.username}
                  onChange={this.props.userEditUserSet}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  placeholder={this.props.currentUser}
                />

                {!this.props.userValid ? (
                  <div className="ui up pointing red basic label">
                    That name is taken!
                  </div>
                ) : (
                  <div />
                )}

                <Geosuggest
                  placeholder="Location"
                  onSuggestSelect={this.props.userEditLocationSet}
                />

                {!this.props.userValid ? (
                  <button className="ui disabled button">Submit</button>
                ) : (
                  <button className="ui active button">Submit</button>
                )}
              </form>
              <h2>View/Edit Your Reviews</h2>
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.props.userEditLoadUser(this.props.currentUser)
                }
              >
                load full profile
              </button>
              {this.props.user ? (
                <UserView
                  user={this.props.user}
                  loggedInUserId={this.props.loggedInUserId}
                />
              ) : (
                []
              )}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userValid: state["userEdit"].get("userValid"),
    location: state["userEdit"].get("location"),
    username: state["userEdit"].get("username"),
    picture: state["userEdit"].get("picture"),
    user: state["userEdit"].get("user"),
    currentUser: state["app"].get("username"),
    loggedIn: state["app"].get("loggedIn"),
    loggedInUserId: props.loggedInUserId,
    open: state["userEdit"].get("modalIsOpened")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userEditUserSet: username => {
      dispatch(UserEditActions.userEditUserSet(username));
      dispatch(UserEditActions.validateUserName(username));
    },
    userEditPictureSet: (picture, pictureName) => {
      dispatch(UserEditActions.userEditPictureSet(picture, pictureName));
    },
    userEditRequest: (username, location, currentUser) => {
      dispatch(
        UserEditActions.userEditRequest(username, location, currentUser)
      );
    },
    userEditLocationSet: location => {
      dispatch(UserEditActions.userEditLocationSet(location));
    },
    userEditLoadUser: username => {
      dispatch(UserEditActions.userEditLoadUser(username));
    },
    modalIsOpened: () => {
      dispatch(UserEditActions.modalIsOpened());
    },
    modalIsClosed: () => {
      dispatch(UserEditActions.modalIsClosed());
    }
  };
};

UserEdit.propTypes = {
  username: PropTypes.string,
  picture: PropTypes.object,
  location: PropTypes.object,
  userValid: PropTypes.bool,
  user: PropTypes.object,
  currentUser: PropTypes.string,
  loggedIn: PropTypes.bool,
  loggedInUserId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEdit);
