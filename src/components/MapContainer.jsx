import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {
  state = {
    visible: false,
    markerActive: {},
    showInfoWindow: false,
    selectedPlace: {},
  };

  handleClick = () => {
    this.setState(state => ({
      visible: !state.visible,
    }));
  };

  handleClickMarker = (props, marker) => {
    this.setState({
      selectedPlace: props,
      markerActive: marker,
      showInfoWindow: true,
    });
  };

  render() {
    const { google, locations } = this.props;
    const { visible, markerActive, showInfoWindow, selectedPlace } = this.state;

    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          {visible ? 'Hide' : 'Show'}
        </button>
        <Map
          google={google}
          zoom={3}
          initialCenter={{ lat: 19.5943885, lng: -97.9526044 }}
          visible={visible}
        >
          {locations.map((location) => (
            <Marker
              name={location.venueName}
              position={{ lat: location.venueLat, lng: location.venueLon }}
              onClick={this.handleClickMarker}
            />
          ))}
          <InfoWindow marker={markerActive} visible={showInfoWindow}>
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
})(MapContainer);