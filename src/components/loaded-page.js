import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchParkInformation } from "../actions";

class LoadedPage extends Component {
  componentDidMount() {
    const { parkCode } = this.props.match.params;
    this.props.fetchParkInformation(parkCode);

  }

  render() {
    console.log(this.props.park)
    return (
      <main>
        <h2>Your next trip will be to...</h2>
        <h1>{this.props.park.fullName}</h1>
        <div id="description" className="module">
          <p>{this.props.park.description}</p>
        </div>
        <div id="cost" className="module">
          <p>{this.props.park.entrancePasses[0].title}</p>
          {/* <p>{this.props.park.entranceFees[0]}</p> */}
        </div>
        <div id="address" className="module">
          <p>Address</p>
        </div>
        <div id="weather" className="module">
          <p>Weather</p>
        </div>
        <div id="hours" className="module">
          <p>Hours</p>
        </div>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Event Item</li>
        </ul>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return { park: state.park };
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({fetchParkInformation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(LoadedPage)
