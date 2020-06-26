import React from "react";
import { connect } from "react-redux";
import RestaurantActions from "./actions";
import PropTypes from "prop-types";
import Geosuggest from "react-geosuggest";

class Restaurant extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Restaurant</h2>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div>
                <h1 className="text-xs-center">Create new restaurant</h1>
                <form
                  className="ui form"
                  onSubmit={() =>
                    this.props.restaurantRequest(
                      this.props.name,
                      this.props.location
                    )
                  }
                >
                  <input
                    className="field "
                    type="text"
                    id="restName"
                    value={this.props.name || ""}
                    placeholder="restaurant name"
                    onChange={this.props.restaurantNameSet}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <Geosuggest
                    placeholder="Location"
                    onSuggestSelect={this.props.restaurantLocationSet}
                  />

                  {!this.props.name || !this.props.location ? (
                    <button className="ui disabled button">Submit</button>
                  ) : (
                    <button className="ui active button">Submit</button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    name: state["restaurant"].get("name"),
    location: state["restaurant"].get("location"),
    reviews: state["restaurant"].get("reviews")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restaurantNameSet: name => {
      dispatch(RestaurantActions.RestaurantNameSet(name));
    },
    restaurantRequest: (name, location) => {
      dispatch(RestaurantActions.RestaurantRequest(name, location));
    },
    restaurantLocationSet: location => {
      dispatch(RestaurantActions.RestaurantLocationSet(location));
    }
  };
};

Restaurant.propTypes = {
  name: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
