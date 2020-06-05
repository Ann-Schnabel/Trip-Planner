import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

import { fetchParkInformation, fetchCampSiteInformation, fetchEVENTInformation } from "../actions";
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer'



class LoadedPage extends Component {
  
  componentDidMount() {
    const { parkCode } = this.props.match.params;
    this.props.fetchParkInformation(parkCode);
    this.props.fetchCampSiteInformation(parkCode);
    this.props.fetchEVENTInformation(parkCode);
  }

  //call this function when the "generate your escape" button is clicked
  updateNationalPark() {
    const parkCodes = ["acad", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care", "cave", "chis", "cuva", "drto", "ever", "glac", "grba", "grca", "grsm", "grte", "gumo", "havo", "hosp", "isro", "jotr", "kefj", "kova", "lavo", "maca", "meve", "mora", "noca", "olym", "pefo", "romo", "sagu", "shen", "thro", "viis", "voya", "wica", "yell", "yose", "zion"];
    const parkCode = parkCodes[Math.floor(Math.random() * parkCodes.length)];
    this.props.fetchParkInformation(parkCode);
    this.props.fetchCampSiteInformation(parkCode);
    this.props.fetchEVENTInformation(parkCode);
    
    return (
      <Redirect to={`/${parkCode}`} />
    )
  }

  renderLi() {
    if (this.props.events.total === '0') {
      return (
        <li>No current events. Find your own Peace in the Wilderness.</li>
      )
    } else {
      return this.props.events.map(event => {
        return (
          <li key={event.title}>{event.title}</li>
        )
      })

    }
  }

  renderCampContactInfo() {
    if (this.props.campsite.total === '0') {
      return (
        <div>
          <h3>No Campsites Available Right Now</h3>
          <p>Consider AirBnB or find a hotel nearby</p>
        </div> 
      )
    } else if (!this.props.campsite.contacts.phoneNumbers || !this.props.campsite.contacts.phoneNumbers[0] ||!this.props.campsite.contacts.emailAddresses || !this.props.campsite.contacts.emailAddresses[0]  ) {
      return (
        <div>
            <h3>{this.props.campsite.name}</h3>
            <p>{this.props.campsite.reservationUrl}</p>
        </div>
      )
    }  else {
      return (
        <div>
            <h3>{this.props.campsite.name}</h3>
            <p>{this.props.campsite.contacts.phoneNumbers[0].phoneNumber}</p>
            <p>{this.props.campsite.contacts.emailAddresses[0].emailAddress}</p>
            <p>{this.props.campsite.reservationUrl}</p>
        </div>
      )
    }
  }

  renderCampFeeInfo() {
    if (this.props.campsite.total === '0') {
      return (
        <div></div> 
      )
    } else if (!this.props.campsite.fees || !this.props.campsite.fees[0] ) {
      return (
        <div>
            <p>No Camp Fees Found</p>
        </div>
      )
    } else {
      return (
        <div>
            <p>{this.props.campsite.fees[0].cost}</p>
            <p>{this.props.campsite.fees[0].description}</p>
        </div>
      )
    } 
  }

  render() {

    const mapStyles = {
      width: '50%',
      height: '50%',
    };

    if (!this.props.park || !this.props.campsite || !this.props.events) {
      return (
        <main>
          <h1>Loading...</h1>
        </main>
      )
    }
    return (
      <div>
      <nav>
        <p>Escape from 2020</p>
        <button onClick={this.updateNationalPark.bind(this)}>Generate Your Escape</button>
      </nav>

        <main>

          <h2>Your next trip will be to...</h2>
          <h1>{this.props.park.fullName}</h1>
          <div id="description" className="module">
            <p>{this.props.park.description}</p>
          </div>
          <div id="cost" className="module">
            <h3>{this.props.park.entranceFees[0].title}</h3>
            <p>${Number(this.props.park.entranceFees[0].cost)}</p>
          </div>
          <div id="address" className="module">
            <h3>Campsite</h3>
            {this.renderCampContactInfo()}
            {this.renderCampFeeInfo()}
          </div>
          <div id="weather" className="module">
            <h3>Weather Info</h3>
            <p>{this.props.park.weatherInfo}</p>
          </div>
          <div id="hours" className="module">
            <h3>Hours</h3>
            <ul>
              <li>Sunday: {this.props.park.operatingHours[0].standardHours.sunday}</li>
              <li>Monday: {this.props.park.operatingHours[0].standardHours.monday}</li>
              <li>Tuesday: {this.props.park.operatingHours[0].standardHours.tuesday}</li>
              <li>Wednesday: {this.props.park.operatingHours[0].standardHours.wednesday}</li>
              <li>Thursday: {this.props.park.operatingHours[0].standardHours.thursday}</li>
              <li>Friday: {this.props.park.operatingHours[0].standardHours.friday}</li>
              <li>Saturday: {this.props.park.operatingHours[0].standardHours.saturday}</li>
            </ul>
          </div>
          <div id="events">
            <h2>Upcoming Events</h2>
            <ul>
              {this.renderLi()}
            </ul>
          </div>

        </main>

        <div id="map">

        <MapContainer latitude={this.props.park.latitude} longitude={this.props.park.longitude}/>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { park: state.park, campsite: state.campsite, events: state.events };
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({fetchParkInformation, fetchCampSiteInformation, fetchEVENTInformation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(LoadedPage)