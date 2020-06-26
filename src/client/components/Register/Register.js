import React, { Component } from "react";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";
import RegisterActions from "../Register/actions";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

class Register extends React.Component {
  handleImage = event => {
    const fileReader = new FileReader();
    const pic = event.target.files[0];

    fileReader.onloadend = () => {
      this.props.registerPictureSet(fileReader.result, pic.name);
    };

    fileReader.readAsDataURL(pic);
  };
  render() {
    return (
      <div>
        <h4>Need An Account?</h4>
        <Button onClick={this.props.modalIsOpened}>Register</Button>
        <Modal
          size="tiny"
          open={this.props.open}
          onClose={this.props.modalIsClosed}
        >
          <Modal.Header>Please fill in information below</Modal.Header>
          <Modal.Content>
            <div className="auth-page">
              <div className="container page">
                <div className="row">
                  <div>
                    <h1 className="text-xs-center">Sign Up</h1>
                    <form
                      className="ui form"
                      onSubmit={() =>
                        this.props.registerRequest(
                          this.props.username,
                          this.props.picture,
                          this.props.location
                        )
                      }
                    >
                      <input
                        className="field "
                        type="text"
                        id="username"
                        value={this.props.username}
                        placeholder="frank.underwood"
                        onChange={this.props.registerUserSet}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
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
                        onSuggestSelect={this.props.registerLocationSet}
                      />

                      <input
                        className="field "
                        type="file"
                        accept="image/"
                        onChange={this.handleImage}
                        placeholder="Picture"
                      />

                      {!this.props.userValid ||
                      !this.props.picture ||
                      !this.props.location ? (
                        <button className="ui disabled button">Submit</button>
                      ) : (
                        <button className="ui active button">Submit</button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: state["register"].get("username"),
    picture: state["register"].get("picture"),
    location: state["register"].get("location"),
    currentlySending: state["register"].get("currentlySending"),
    userValid: state["register"].get("userValid"),
    open: state["register"].get("modalIsOpened")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUserSet: username => {
      dispatch(RegisterActions.registerUserSet(username));
      dispatch(RegisterActions.validateUserName(username));
    },
    registerPictureSet: (picture, pictureName) => {
      dispatch(RegisterActions.registerPictureSet(picture, pictureName));
    },
    registerRequest: (username, picture, location) => {
      dispatch(RegisterActions.registerRequest(username, picture, location));
    },
    registerLocationSet: location => {
      dispatch(RegisterActions.registerLocationSet(location));
    },
    modalIsOpened: () => {
      dispatch(RegisterActions.modalIsOpened());
    },
    modalIsClosed: () => {
      dispatch(RegisterActions.modalIsClosed());
    }
  };
};

Register.propTypes = {
  username: PropTypes.string,
  picture: PropTypes.object,
  location: PropTypes.object,
  currentlySending: PropTypes.bool,
  userValid: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
